'use client';
import { useEffect, useState } from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';
import clsx from 'clsx';
import AuthLayout from '../components/AuthLayout';
import Link from 'next/link';


const todoListPage = () => {

    return (
        <AuthLayout>
            <div className="justify-center rounded-4xl items-center flex flex-col h-full bg-gray-100">
                <h1 className="text-4xl font-bold text-center mb-4">Wellcome to ToDoPy</h1>
                <p className="mb-6 text-center px-[10%]">
                    A to-do app is a simple, user-friendly digital tool designed to help individuals and teams organize tasks and manage their daily activities efficiently.
                    Users can create, edit, and prioritize tasks, set deadlines or reminders, categorize items, and track their progress, all within an intuitive and accessible interface.
                    These apps are essential for improving productivity, reducing stress, and ensuring that important responsibilities are not forgotten.
                </p>
                <div className="flex justify-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors mb-4">
                        <Link href="todoList/upComing">Get Started </Link>
                    </button>
                </div>
            </div>
        </AuthLayout >
    );
}

export default todoListPage
