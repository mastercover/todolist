'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import LoginLayout from '@/app/components/LoginLayout';
import Link from 'next/link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function RegisterPage() {
    const router = useRouter();
    const [isfocus, setIsfocus] = React.useState(false);
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [message, setMessage] = React.useState<string | null>(null);

    const passwordTooShort = password.length > 0 && password.length < 8;
    const confirmMismatch = confirmPassword.length > 0 && confirmPassword !== password;
    const formInvalid = !email || !password || !confirmPassword || !firstName || !lastName || passwordTooShort || confirmMismatch;
    const checkPasswords = [
        {
            label: (
                <>
                    8-15 <strong>Characters</strong>
                </>
            ),
            valid: password.length >= 8 && password.length <= 15,
        },
        {
            label: (
                <>
                    At least <strong>one capital letter</strong>
                </>
            ),
            valid: /[A-Z]/.test(password),
        },
        {
            label: (
                <>
                    At least <strong>one small letter</strong>
                </>
            ),
            valid: /[a-z]/.test(password),
        },
        {
            label: (
                <>
                    At least <strong>one number</strong>
                </>
            ),
            valid: /\d/.test(password),
        },
        {
            label: (
                <>
                    At least <strong>one special character</strong>
                </>
            ),
            valid: /[!@#$%^&*]/.test(password),
        },
    ];

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (formInvalid) return;

        setLoading(true);
        try {
            const res = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, lastName, firstName }),
            });

            let data: any = null;
            try {
                data = await res.json();
            } catch {
                throw new Error('Máy chủ không trả về JSON hợp lệ.');
            }

            if (!res.ok) {
                throw new Error(data?.message || `Register failed (HTTP ${res.status})`);
            }
            setMessage(data?.message || 'Đăng ký thành công. Vui lòng kiểm tra email để xác minh tài khoản.');

            setTimeout(() => {
                router.push('/users/home?registered=1');
            }, 800);
        } catch (err: any) {
            setError(err?.message || 'Đã xảy ra lỗi không xác định.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <LoginLayout>
            <h1 className="text-5xl font-bold mb-4">Sign up</h1>
            <form onSubmit={handleSubmit} className="" noValidate>
                <div className="mb-[10px] rounded-lg">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 w-full p-2"
                    />
                </div>
                <div className="mb-[10px] rounded-lg">
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 w-full p-2"
                    />
                </div>
                <div className="mb-[10px] rounded-lg">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email.@example.com"
                        required
                        className="rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 w-full p-2"
                    />
                </div>
                <div className="relative w-full mb-[10px]">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Ít nhất 8 ký tự"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        className="w-full border border-gray-400 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onFocus={() => setIsfocus(true)}
                        onBlur={() => setIsfocus(false)}
                    />
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
                {passwordTooShort && (
                    <div style={{ color: '#c00', fontSize: 13, marginTop: 6 }}>
                        Mật khẩu phải có tối thiểu 8 ký tự.
                    </div>
                )}

                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full border border-gray-400 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <div className={`absolute inset-y-0 right-[10px] flex items-center bg-blue-50 h-[50px] top-[50%] transition-opacity ${isfocus ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="top-full left-0 mt-2 w-64 bg-gray-800 text-white text-sm rounded-lg px-3 py-2 shadow-lg">
                        🔒 Password must:
                        {checkPasswords.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                {/* Icon với nền xanh/đỏ */}
                                <span
                                    className={`flex items-center justify-center w-3.5 h-3 rounded-full ${item.valid ? 'bg-green-600' : 'bg-red-600'
                                        }`}
                                >
                                    {item.valid ? (
                                        <CheckCircleIcon className="text-white" fontSize="small" />
                                    ) : (
                                        <DisabledByDefaultIcon className="text-white" fontSize="small" />
                                    )}
                                </span>

                                {/* Text đổi màu */}
                                <span className={`text-[12px] ${item.valid ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.label}
                                </span>
                            </li>
                        ))}
                    </div>
                </div>
                {confirmMismatch && (
                    <div style={{ color: '#c00', fontSize: 13, marginTop: 6 }}>
                        Mật khẩu xác nhận không khớp.
                    </div>
                )}

                {error && (
                    <div style={{ background: '#fee', border: '1px solid #f99', color: '#900', padding: 10, borderRadius: 8, marginTop: 12 }}>
                        {error}
                    </div>
                )}

                {message && (
                    <div style={{ background: '#f0fff4', border: '1px solid #9ae6b4', color: '#22543d', padding: 10, borderRadius: 8, marginTop: 12 }}>
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || formInvalid}
                    style={{
                        marginTop: 16,
                        width: '100%',
                        padding: 12,
                        borderRadius: 8,
                        border: 'none',
                        background: loading || formInvalid ? '#ccc' : '#111',
                        color: '#fff',
                        cursor: loading || formInvalid ? 'not-allowed' : 'pointer',
                        fontWeight: 600,
                    }}
                >
                    {loading ? 'Đang xử lý...' : 'Đăng ký'}
                </button>
            </form>

            <p className="text-center">
                Already have a account?{" "}
                <Link href="/users/login" className="hover:underline">
                    Sign In
                </Link>
            </p>
        </LoginLayout>
    );
}
