'use client';
import { useEffect, useState } from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';
import clsx from 'clsx';
import Link from 'next/link';
import AuthLayout from '@/app/components/AuthLayout';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

const todoListPage = () => {
    const [now, setNow] = useState(new Date());
    const formatted = now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const localizer = momentLocalizer(moment);

    interface MyEvent extends Event {
        title: string;
        start: Date;
        end: Date;
    }

    const events: MyEvent[] = [
        {
            title: 'Database create for company',
            start: new Date(2025, 7, 29, 9, 0), // 29 Aug 2025, 9:00 AM
            end: new Date(2025, 7, 29, 11, 0),
        },
        {
            title: 'Meet work team',
            start: new Date(2025, 7, 29, 11, 0),
            end: new Date(2025, 7, 29, 12, 0),
        },
        {
            title: 'Consult accountant',
            start: new Date(2025, 7, 29, 14, 0),
            end: new Date(2025, 7, 29, 15, 0),
        },
    ];

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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout >
    );
}

export default todoListPage
