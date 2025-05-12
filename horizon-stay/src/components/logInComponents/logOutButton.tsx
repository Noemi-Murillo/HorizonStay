'use client';

import { useRouter } from 'next/navigation';
import { handleLogout } from '@/controllers/authController';

export default function LogoutButton() {
  const router = useRouter();

  const onLogout = async () => {
    const result = await handleLogout();
    if (result.success) {
      router.push('/login');
    } else {
      alert(result.message);
    }
  };

  return <button onClick={onLogout}>Cerrar sesión</button>;
}
