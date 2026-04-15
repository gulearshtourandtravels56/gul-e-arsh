'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLock, FiUser } from 'react-icons/fi';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        setError(result.error || 'Login failed');
        return;
      }

      router.replace('/admin');
      router.refresh();
    } catch {
      setError('Unable to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-7">
        <h1 className="text-2xl font-bold text-dark mb-1">Admin Login</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in with admin username and password.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Username</label>
            <div className="mt-1 relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={formData.username}
                onChange={(e) => setFormData((p) => ({ ...p, username: e.target.value }))}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
