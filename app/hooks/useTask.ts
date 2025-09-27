'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchTasks = async (date?: string) => {
    const url = date
        ? `${API_BASE_URL}/api/tasks/search/by-date?date=${date}`
        : `${API_BASE_URL}/api/tasks`;

    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
    });

    if (!res.ok) throw new Error('Lỗi khi fetch dữ liệu');
    return res.json();
};

const addTask = async (task: { title: string; description: string; dueDate: string }) => {
    const res = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error('Add task failed');
    return res.json();
};

const updateTask = async ({ id, task }: { id: string; task: { status: string } }) => {
    const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error('Update task failed');
    return res.json();
};

const deleteTask = async (id: number) => {
    const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Delete task failed');
    return res.json();
};

export function useTasks(date?: string) {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['tasks', date],
        queryFn: () => fetchTasks(date),
    });

    const addMutation = useMutation({
        mutationFn: addTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateTask,

        // 👇 Optimistic Update
        onMutate: async (updated: { id: string; task: { status: string } }) => {
            await queryClient.cancelQueries({ queryKey: ['tasks'] });

            const previousTasks = queryClient.getQueryData<any[]>(['tasks', date]);

            queryClient.setQueryData<any[]>(['tasks', date], (old) =>
                old
                    ? old.map((t) =>
                          t.id === updated.id ? { ...t, status: updated.task.status } : t
                      )
                    : []
            );

            return { previousTasks };
        },

        onError: (_err, _updated, context) => {
            if (context?.previousTasks) {
                queryClient.setQueryData(['tasks', date], context.previousTasks);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    return {
        ...query, // { data, isLoading, error, ... }
        addTask: addMutation.mutate,
        updateTask: updateMutation.mutate,
        deleteTask: deleteMutation.mutate,
    };
}
