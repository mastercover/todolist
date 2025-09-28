'use client';
import { useEffect, useState } from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';
import clsx from 'clsx';
import Link from 'next/link';
import AuthLayout from '@/app/components/AuthLayout';
import { Calendar, Views, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useTasks } from '@/app/hooks/useTask';

const localizer = momentLocalizer(moment);
interface MyEvent extends Event {
    id: string;
    title: string;
    start: Date;
    end: Date;
    status?: string;
}

const todoListPage = () => {
    const { data: tasks, isLoading, error } = useTasks();
    const [now, setNow] = useState(new Date());

    const formatted = now.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const [view, setView] = useState(Views.MONTH);

    // map tasks từ API thành events cho Calendar
    const events: MyEvent[] =
        tasks?.map((task: any) => ({
            id: task.id,
            title: task.title,
            start: new Date(task.dueDate), // dùng dueDate làm thời gian bắt đầu
            end: new Date(task.dueDate), // nếu chưa có endDate thì tạm = start
            status: task.status,
        })) ?? [];


    return (
        <AuthLayout>
            <div className="rounded-4xl flex flex-col h-full ">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold"><Link href="">{formatted}</Link></h1>
                    <button className="border border-gray-400 rounded px-4 py-1 text-sm hover:bg-gray-100">
                        Add Event
                    </button>
                </div>
                <div className="h-full">
                    <div className="justify-center h-full">
                        <div className="h-full bg-white rounded-xl shadow">
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: '100%' }}
                                defaultView={Views.MONTH}
                                view={view}
                                onView={(newView) => setView(newView)}
                                views={['month', 'week', 'day', 'agenda']}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout >
    );
}

export default todoListPage
