'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../context/UserContext';
import LoginLayout from '@/app/components/LoginLayout';
import Link from 'next/link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function LoginPage() {
    const router = useRouter();
    const { setUserEmail } = useUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Email và mật khẩu không được để trống');
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email, // Symfony mặc định nhận "username"
                    password: password,
                }),
            });

            if (!res.ok) {
                throw new Error('Sai email hoặc mật khẩu');
            }

            const data = await res.json();

            // Lưu token vào localStorage
            localStorage.setItem('userEmail', data.user.email);
            localStorage.setItem('token', data.token);
            setUserEmail(data.user.email);

            // Chuyển hướng sang /users
            router.push('/');
        } catch (err: any) {
            setError(err.message || 'Đăng nhập thất bại');
        }
    };

    return (
        <LoginLayout>
            <h1 className="text-5xl font-bold mb-4">Sign in</h1>
            <form onSubmit={handleLogin} noValidate>
                <div className="mb-[10px] rounded-lg">
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email.@example.com"
                        style={{ width: '100%', padding: 8 }}
                        required
                        className="rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="relative w-full mb-[10px]">
                    {/* Ô nhập password */}
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        required
                        className="w-full border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    {/* Nút toggle icon */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800">
                        {showPassword ? (
                            <VisibilityOffIcon className="h-5 w-5" />
                        ) : (
                            <VisibilityIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 w-full rounded-lg transition-colors mb-4">
                    Đăng nhập
                </button>

            </form>
            <p className="text-center">
                Don't have an account?{" "}
                <Link href="/users/register" className="hover:underline">
                    Sign Up
                </Link>
            </p>
        </LoginLayout>
    );
}
