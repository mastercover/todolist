'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function UsersPage() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const API_BASE =
            process.env.API_BASE?.replace(/\/$/, '') || 'http://localhost:8080';
        if (!token) {
            setError('Chưa đăng nhập');
            return;
        }

        fetch(API_BASE + '/api/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: 'GET',
        })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error('Không lấy được thông tin user');
                }
                return res.json();
            })
            .then((data) => {
                setEmail(data.email);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    return (
        <>
            <div style={{ padding: 20 }}>
                {email ? <p>Email: {email}</p> : <p>Đang tải...</p>}
            </div>
            <div>
                <Link href="/users/home">Home</Link>
            </div>
        </>
    );
}

