
# 🏕️ Horizon Stay – Sistema de Reservas Inteligente

Este proyecto es un sistema completo de gestión de reservas para un complejo turístico con tres tipos de cabañas: junto al lago, en el bosque y en el árbol. Desarrollado con **Next.js** y **Firebase Realtime Database**, el sistema permite a los clientes realizar reservas, y a los administradores gestionar bloqueos de fechas y modificar precios automáticamente reservas mediante un **Model Context Protocol (MCP)** basado en IA.

---

## 🚀 Tecnologías Utilizadas

- **Next.js 14** – Framework React para frontend y API routes
- **Firebase Realtime Database** – Base de datos en tiempo real
- **Firebase Authentication** – Inicio de sesión para administradores
- **Tailwind CSS** – Estilizado rápido y responsivo
- **FullCalendar** – Gestión visual de calendarios de reserva y bloqueo
- **Supabase** *(solo temporal en pruebas)*
- **OpenAI API (MCP)** – Reorganización de reservas y predicción de precios por demanda

---

## 🧩 Estructura del Proyecto


---

## 🔑 Funcionalidades Principales

### Cliente

- 📅 Selección de fechas y tipo de cabaña
- 🛌 Formulario de reserva con validación
- 📧 Correo de confirmación
- 🔁 Consulta de reservas existentes

### Administrador

- 🔒 Inicio de sesión vía Firebase Auth
- 🧱 Bloqueo de fechas (limpieza, mantenimiento)
- 💸 Gestión de precios por tipo de cabaña y temporada

### Model Context Protocol (MCP)

- 🔍 Analiza la demanda de un año de reservas
- 📈 Ajusta precios automáticamente (épocas altas/bajas)

---

## ⚙️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/horizon-stay.git
cd horizon-stay
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Variables de Entorno

Crea un archivo `.env.local` con tus claves:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_DATABASE_URL=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 4. Ejecutar el Proyecto

```bash
npm run dev
```

---

## 🧪 Pruebas

Se recomienda probar los siguientes casos:

- Hacer una reserva como cliente
- Crear un bloqueo desde el panel admin
- Simular demanda alta y observar cambios de precio

---

## 📬 Contacto

Para dudas o sugerencias:

- Email: horizon.stay.complex@gmail.com
- Web: https://horizon-stay-g2h9-49gmev2n9-noemi-murillos-projects.vercel.app/

---
 
> Proyecto desarrollado por Noemí Murillo y Marconi Calvo🌐
