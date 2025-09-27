'use client';
import React, { useMemo, useState } from 'react';
import AuthLayout from '@/app/components/AuthLayout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Link from 'next/link';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTasks } from '@/app/hooks/useTask';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


type Task = { id: string; title: string; description: string; dueDate: string };

function formatYMDLocal(d: Date) {
    return d.toLocaleDateString('en-CA');
}

type TodayTask = {
    description: string;
    dueDate: string;
    status: string;
    assignedTo?: string;
    id: string;
};


const TASK_STATUS_OPTIONS: { value: string; label: string }[] = [
    { value: "inProgress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "deleted", label: "Deleted" },
    { value: "notStarted", label: "Not Started" },
    { value: "pending", label: "Pending" },
    { value: "delay", label: "Delay" },
];

const Today = () => {
    const { data, isLoading, error, addTask, updateTask /*, deleteTask, refetch? */ } = useTasks();
    const todayStr = useMemo(() => formatYMDLocal(new Date()), []);

    const todayTasks = useMemo<TodayTask[]>(() => {
        if (!data) return [];
        return (data as Task[])
            .filter(t => formatYMDLocal(new Date(t.dueDate)) === todayStr)
            .map(t => ({
                description: t.description,
                dueDate: t.dueDate,
                status: t.status,
                assignedTo: t.assignedTo?.email,
                id: t._id,
            }));
    }, [data, todayStr]);

    if (isLoading) return <p>Đang tải dữ liệu...</p>;
    if (error instanceof Error) return <p>Lỗi: {error.message}</p>;

    const handleAdd = async (desc: string) => {
        if (!desc.trim()) return;
        await addTask({
            title: 'New task in today page',
            description: desc,
            dueDate: new Date().toISOString(),
        });
    };


    return (
        <AuthLayout>
            <div className="rounded-4xl flex flex-col h-full ">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <h1 className="text-4xl font-bold pr-5">
                            <Link href="">Today</Link>
                        </h1>
                        <span className="px-4 py-1 border border-gray-400 rounded-full text-sm">
                            {todayTasks.length}
                        </span>
                    </div>
                </div>

                <div className="h-full">
                    <div className="justify-center h-full">
                        <div className="h-full">
                            <TaskCard title="Today" tasks={todayTasks} onAdd={handleAdd} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Today;

function TaskCard({
    title,
    tasks,
    onAdd,
}: {
    title: string;
    tasks: TodayTask[];
    onAdd: (desc: string) => Promise<void> | void;
}) {
    const [newTask, setNewTask] = useState('');
    const queryClient = useQueryClient();
    const [localTasks, setLocalTasks] = useState<any[]>([]);

    const handleAddTask = async () => {
        if (!newTask.trim()) return;
        await onAdd(newTask);
        setNewTask('');
    };
    const { updateTask /*, deleteTask, refetch? */ } = useTasks();

    const handleToggleStatus = async (id: string, status: string) => {
        const newStatus = status === "completed" ? "pending" : "completed";

        try {
            await updateTask({ id, task: { status: newStatus } });
        } catch (err) {
            console.error("Lỗi update task:", err);
        }
    };

    const handleChangeStatus = (id: string, newStatus: string) => {
        setLocalTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
        );
        updateTask({ id, task: { status: newStatus } });
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm h-full">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>


            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mb-4">
                <button className="px-3 text-gray-500" type="button" onClick={handleAddTask}>
                    <AddCircleOutlineIcon fontSize="small" />
                </button >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddTask();
                    }}
                    className="w-full"
                >
                    <input
                        type="text"
                        placeholder="Add new task"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="w-full p-2 outline-none text-sm"
                    />
                </form>
            </div >

            {/* Task list */}
            <ul className="h-full">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="flex items-center justify-between border-b border-gray-200 pb-2 mb-1"
                    >
                        <div className="flex items-center">
                            {task.status === "completed" ? (
                                <CheckCircleIcon
                                    className="text-green-500 cursor-pointer mr-2"
                                    onClick={() => handleToggleStatus(task.id, task.status)}
                                />
                            ) : (
                                <CheckCircleOutlineIcon
                                    className="text-gray-400 cursor-pointer mr-2"
                                    onClick={() => handleToggleStatus(task.id, task.status)}
                                />
                            )}
                            <span className="text-gray-700">{task.description}</span>
                        </div>

                        <select
                            value={task.status}
                            onChange={(e) => handleChangeStatus(task.id, e.target.value)}
                            className="ml-2 border rounded px-2 py-1 text-sm"
                        >
                            {TASK_STATUS_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </li>
                ))}
            </ul>
        </div >
    );
}