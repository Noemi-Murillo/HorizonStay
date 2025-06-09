'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleLogin } from '@/controllers/authController';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleLogin(email, password);
    if (result.success) {
      router.push('/adminPages');
    } else {
      setError(result.message);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-green-400 dark:border-green-800 max-w-lg mx-auto mt-40"
    >
      <div className="px-8 py-10 md:px-10">
        <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
          ¡Bienvenido!
        </h2>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
          Este inicio de sesión es solo para administrativos, si quieres reservar dale click al botón de reservar al inicio de la página. 
        </p>

        <div className="mt-10">
          <div className="relative">
            <label
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="email"
            >
              Email
            </label>
            <input
              placeholder="you@example.com"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              name="email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-6">
            <label
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              placeholder="••••••••"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              name="password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-600 text-center">{error}</p>
          )}

          <div className="mt-10">
            <button
              className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-green-600 to-cyan-600 rounded-lg hover:from-green-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-green-400 dark:focus:ring-blue-800"
              type="submit"
            >
              Let's Go
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
