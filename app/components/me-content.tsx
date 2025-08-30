'use client';

import React from 'react';

type Me = {
  id: number;
  email: string;
};

type MeState = {
  user: Me | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const MeContext = React.createContext<MeState | undefined>(undefined);

// Bạn có thể đổi BASE ở .env.local -> NEXT_PUBLIC_API_BASE
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/+$/, '') || 'http://localhost:8080';

async function fetchMe(token: string): Promise<Me> {
  const res = await fetch(`${API_BASE}/api/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    // Không cache vì đây là dữ liệu phiên
    cache: 'no-store',
  });

  // Thử parse JSON an toàn
  let data: any = null;
  try {
    data = await res.json();
  } catch {
    throw new Error('Máy chủ không trả về JSON hợp lệ.');
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed (HTTP ${res.status})`);
  }
  return data as Me;
}

export function MeProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<Me | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        return;
      }
      const me = await fetchMe(token);
      setUser(me);
    } catch (e: any) {
      setUser(null);
      setError(e?.message || 'Không thể tải thông tin người dùng.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    // Gọi 1 lần khi mount
    load();
  }, [load]);

  const value: MeState = {
    user,
    loading,
    error,
    refresh: load,
  };

  return <MeContext.Provider value={value}>{children}</MeContext.Provider>;
}

export function useMe() {
  const ctx = React.useContext(MeContext);
  if (!ctx) {
    throw new Error('useMe() phải được dùng bên trong <MeProvider>.');
  }
  return ctx;
}
