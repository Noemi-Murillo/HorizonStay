import './globals.css';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar'; 

export const metadata = {
  title: 'Mi Sitio',
  description: 'Ejemplo con Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header>
          <Navbar />
        </header>

        <main>{children}</main>

      </body>
    </html>
  );
}
