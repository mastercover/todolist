'use client';
import React from 'react'
import { useState } from 'react';
import AuthLayout from '@/app/components/AuthLayout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styles from ".auth.module.css";
import Link from 'next/link';


const upComing = () => {
    const [todayTasks, setTodayTasks] = useState([
        "Database create for company",
        "Website templates",
        "Meet work team",
    ]);

    const [tomorrowTasks, setTomorrowTasks] = useState([
        "Work team",
        "Job interview",
    ]);

    const [weekTasks, setWeekTasks] = useState([
        "Research content ideas",
        "Consult accountant",
        "Print business card",
    ]);
    return (
        <AuthLayout>
            <div className="rounded-4xl flex flex-col h-full ">
                <div className="flex items-center mb-8">
                    <h1 className="text-4xl font-bold pr-5">Upcoming</h1>
                    <span className="px-4 py-1 border border-gray-400 rounded-full text-sm">
                        18
                    </span>
                </div>
                <div className="">
                    <div className="justify-center">
                        <div className="mb-11">
                            <TaskCard title="Today" tasks={todayTasks} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <TaskCard title="Tomorrow" tasks={tomorrowTasks} />
                            <TaskCard title="This Week" tasks={weekTasks} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout >
    )
}

function TaskCard({ title, tasks }: { title: string; tasks: string[] }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4"><Link href="/todoList/today">{title}</Link></h2>

            {/* Input add task */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mb-4">
                <span className="px-3 text-gray-500">
                    <AddCircleOutlineIcon fontSize="small" />
                </span>
                <input
                    type="text"
                    placeholder="Add new task"
                    className="w-full p-2 outline-none text-sm"
                />
            </div>

            {/* Tasks list */}
            <ul className="mb-10">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className="flex items-center border-b border-gray-200 pb-2 mb-1"
                    >
                        <input type="checkbox" className="mr-2" />
                        <span className="text-gray-700">{task}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default upComing
