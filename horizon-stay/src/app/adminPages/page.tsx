'use client';

import Head from 'next/head';
import '@/app/styles/reservation.css';
import { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebaseClient';
import { signOut } from 'firebase/auth';

const BlockModal = dynamic(() => import('@/components/reservationComponents/blockModal'), { ssr: false });
const PriceModal = dynamic(() => import('@/components/reservationComponents/priceManagmentModal'), { ssr: false });
const EventModal = dynamic(() => import('@/components/reservationComponents/modalEvent'), { ssr: false });
const EditEventModal = dynamic(() => import('@/components/reservationComponents/editEventModal'), { ssr: false });
const MonthSelectorModal = dynamic(() => import('@/components/reservationComponents/monthSelectorModal'), { ssr: false });

const FullCalendar = dynamic(() => import('@fullcalendar/react'), { ssr: false });
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import esLocale from '@fullcalendar/core/locales/es';

type CalendarEvent = {
  id: string;
  start: string | Date;
  end: string | Date;
  title: string;
  extendedProps: {
    ids: string;
    type: string;
    name?: string;
    email?: string;
    phone?: string;
    status?: string;
  };
};

export default function Reservations() {
  const [events, setEvents] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [arrangementModalOpen, setArrangementModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch('/api/checkReservations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: 1 })
          }),
          fetch('/api/getBlocks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ value: 1 })
          })
        ]);

        const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

        if (!data1.data?.cottages || !data1.data?.reservations) return;

        const cottageResources = Object.entries(data1.data.cottages).map(
          ([id, value]: [string, any]) => ({ id, title: value.name })
        );

        const calendarEvents = Object.entries(data1.data.reservations).map(
          ([id, value]: [string, any]) => {
            const isPending = value.status?.toLowerCase() === 'pendiente';
            return {
              id,
              ids: value.ids,
              title: `Reserva ${id}`,
              start: value.start,
              end: value.end,
              resourceId: value.cottage_id,
              backgroundColor: isPending ? '#FBBF24' : '#00a63e',
              editable: true,
              type: 'reserva',
              email: value.email,
              name: value.name,
              phone: value.phone,
              status: value.status
            };
          }
        );

        setResources(cottageResources);
        setEvents([...calendarEvents, ...data2.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = useCallback(async () => {
    await signOut(auth);
    router.push('/');
  }, [router]);

  const handleEventClick = useCallback((clickInfo: any) => {
    setSelectedEvent(clickInfo.event);
    setEventModalOpen(true);
  }, []);

  const handleEventDrop = useCallback(async (info: any) => {
    const id = info.event.id;
    const start = info.event.startStr;
    const end = new Date(info.event.endStr);
    end.setHours(12, 0, 0, 0);
    const resource = info.event.getResources()[0]?.id;

    const result = await Swal.fire({
      title: '¿Confirmar modificación?',
      text: '¿Deseas guardar el cambio de fechas o cabaña?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch('/api/updateReservation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, start, end: end.toISOString(), cottage_id: resource })
        });
        response.ok
          ? Swal.fire('Guardado', 'La reservación fue actualizada correctamente.', 'success')
          : Swal.fire('Error', 'La reservación no pudo ser actualizada', 'warning');
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      info.revert();
    }
  }, []);

  return (
    <>
      <Head>
        <title>Panel de Administración | Reservaciones</title>
        <meta name="description" content="Gestión de reservaciones, bloqueos y precios de cabañas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>

      <main className="max-w-[1400px] mx-auto p-1 mb-10">
        <header>
          <h1 className="text-2xl font-bold">Reservaciones</h1>
          <p className="text-gray-600">Mantenimiento de reservaciones</p>
        </header>

        <div className="flex justify-between items-center flex-wrap gap-2 my-5">
          <div className="flex gap-5">
            <button className="bg-green-600 hover:bg-yellow-400 transition px-8 py-3 rounded text-white font-bold text-lg w-80 cursor-pointer" onClick={() => setModalOpen(true)}>Crear bloqueos</button>
            <button className="bg-green-600 hover:bg-yellow-400 transition px-8 py-3 rounded text-white font-bold text-lg w-80 cursor-pointer" onClick={() => setPriceModalOpen(true)}>Gestionar precios</button>
            <button className="bg-green-600 hover:bg-yellow-400 transition px-8 py-3 rounded text-white font-bold text-lg w-80 cursor-pointer" onClick={() => setArrangementModalOpen(true)}>Acomodar reservas</button>
          </div>
          <button onClick={handleLogout} className="ml-auto w-40 px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-red-600 cursor-pointer">Cerrar sesión</button>
        </div>

        <section aria-label="Guía de colores">
          <p><span role="img" aria-label="Verde">🟢</span> Reservación confirmada y pagada</p>
          <p><span role="img" aria-label="Amarillo">🟡</span> Reservación pendiente de pago</p>
          <p><span role="img" aria-label="Rojo">🔴</span> Bloqueo administrativo</p>
        </section>

        <FullCalendar
          height={750}
          plugins={[resourceTimelinePlugin, interactionPlugin]}
          initialView="resourceTimelineMonth"
          headerToolbar={{ left: 'prev,next today', center: 'title', right: 'resourceTimelineMonth,resourceTimelineDay,resourceTimelineWeek' }}
          nowIndicator={true}
          editable={true}
          slotLabelContent={(arg) => ({ html: `<span>${arg.text}</span>` })}
          selectable={true}
          selectMirror={true}
          resources={resources}
          events={events}
          slotDuration="12:00:00"
          eventDrop={handleEventDrop}
          eventClick={handleEventClick}
          locale={esLocale}
        />

        <MonthSelectorModal isOpen={arrangementModalOpen} onClose={() => setArrangementModalOpen(false)} />


        <EventModal
          isOpen={eventModalOpen}
          onClose={() => setEventModalOpen(false)}
          eventData={selectedEvent}
          onConfirm={async () => {
            if (!selectedEvent?.id || !selectedEvent?.extendedProps?.ids) return;
            const eventoConfirmar = { id: selectedEvent.id, ids: selectedEvent.extendedProps.ids };
            const res = await fetch('/api/confirmReservation', {
              method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventoConfirmar })
            });
            const result = await res.json();
            if (result.ok) {
              Swal.fire('Confirmado', 'La reservación fue creada correctamente.', 'success');
              setTimeout(() => window.location.reload(), 1900);
            } else {
              Swal.fire('Error', 'No se pudo confirmar la reservación.', 'error');
            }
            setEventModalOpen(false);
          }}
          onEdit={() => { }}
          onDelete={async () => {
            if (!selectedEvent?.id || !selectedEvent?.extendedProps?.ids) return;
            const confirm = await Swal.fire({
              title: '¿Eliminar evento?',
              text: 'Esta acción no se puede deshacer.',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Sí, eliminar',
            });
            if (confirm.isConfirmed) {
              const type = selectedEvent.extendedProps.type;
              const eventoAEliminar = { id: selectedEvent.id, ids: selectedEvent.extendedProps.ids };
              const endpoint = type === 'bloqueo' ? '/api/deleteBlocks' : '/api/deleteReservation';
              const res = await fetch(endpoint, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ eventoAEliminar })
              });
              const result = await res.json();
              if (result.ok) {
                Swal.fire('Eliminado', `${type === 'bloqueo' ? 'El bloqueo' : 'La reservación'} fue eliminado correctamente.`, 'success');
                setEventModalOpen(false);
                setEvents(prev => prev.filter(e => e.id !== selectedEvent.id));
              } else {
                Swal.fire('Error', 'No se pudo eliminar.', 'error');
              }
            }
          }}
        />

        <BlockModal isOpen={modalOpen} onClose={() => setModalOpen(false)} cottages={resources} onSubmit={async (start, end, cottageId, description) => {
          const overlapExists = events.some((event) => {
            const isSameCottage = event.resourceId === cottageId;
            const eventStart = new Date(event.start).getTime();
            const eventEnd = new Date(event.end).getTime();
            const blockStart = new Date(start).getTime();
            const blockEnd = new Date(end).getTime();
            return isSameCottage && blockStart < eventEnd && blockEnd > eventStart;
          });
          if (overlapExists) {
            Swal.fire('Error', 'Ya existe una reserva o bloqueo en ese rango de fechas.', 'error');
            return;
          }
          const response = await fetch('/api/createBlock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ start, end, cottageId, description })
          });
          if (response.ok) {
            Swal.fire('¡Éxito!', 'Se ha guardado el bloqueo exitosamente.', 'success');
            setTimeout(() => window.location.reload(), 1900);
          } else {
            Swal.fire('Error', 'No se pudo guardar el bloqueo.', 'warning');
          }
        }} />

        <PriceModal isOpen={priceModalOpen} onClose={() => setPriceModalOpen(false)} />
      </main>
    </>
  );
}
