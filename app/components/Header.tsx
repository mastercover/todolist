'use client';

import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

export default function Header() {
  const router = useRouter();
  const { userEmail, setUserEmail } = useUser();


  const handleLogout = async () => {
    localStorage.removeItem('userEmail');
    setUserEmail(null);
    try {
      const API_BASE =
        process.env.API_BASE?.replace(/\/$/, '') || 'http://localhost:8080';
      await fetch(API_BASE + '/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      localStorage.removeItem('userEmail');
      localStorage.removeItem('token');
      setUserEmail(null);

      router.push('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <header style={{ background: '#111', color: '#fff', padding: '12px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
        
        <Link href="/" style={{ fontWeight: 700, fontSize: 20, color: '#fff', textDecoration: 'none' }}>
          My Website
        </Link>

        {/* Menu bên phải */}
        <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {userEmail ? (
            <>
              <span style={{ fontSize: 14, opacity: 0.9 }}>{userEmail}</span>
              <button
                onClick={handleLogout}
                style={{
                  background: '#f44336',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: 6,
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                style={{
                  background: '#fff',
                  color: '#111',
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Đăng nhập
              </Link>
              <Link
                href="/register"
                style={{
                  background: '#4caf50',
                  color: '#fff',
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Đăng ký
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
