'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { label: 'Ver Reservaciones', path: '/adminPages/reservations' },
    { label: 'Crear Bloqueos', path: '/adminPages/block-dates' },
    { label: 'Modificar Reservas', path: '/adminPages/edit-reservations' },
    { label: 'Generar Predicciones', path: '/adminPages/predictions' },
    { label: 'Control de Chatbot', path: '/adminPages/chatBotControl' },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 p-4 border-r flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Panel Admin</h2>
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`block px-4 py-2 rounded hover:bg-gray-200 ${
                    pathname === item.path ? 'bg-blue-200 text-blue-800 font-semibold' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Botón de Cerrar sesión */}
        <button
          onClick={handleLogout}
          className="mt-8 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
