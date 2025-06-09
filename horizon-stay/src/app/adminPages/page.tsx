'use client';

import '@/app/styles/reservation.css';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import Swal from 'sweetalert2';
import BlockModal from '@/components/reservationComponents/blockModal';
import PriceModal from '@/components/reservationComponents/priceManagmentModal';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebaseClient';
import { signOut } from 'firebase/auth';
import EventModal from '@/components/reservationComponents/modalEvent';
import EditEventModal from '@/components/reservationComponents/editEventModal';

export default function Reservations() {
  const [events, setEvents] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/checkReservations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value: 1 })
        });
        const data = await response.json();
        if (!data.data || !data.data.cottages || !data.data.reservations) {
          console.error('Datos faltantes en la respuesta', data);
          return;
        }
        const cottageResources = Object.entries(data.data.cottages).map(
          ([id, value]: [string, any]) => ({ id, title: value.name })
        );
        const calendarEvents = Object.entries(data.data.reservations).map(
          ([id, value]: [string, any]) => {
            const isPending = value.status?.toLowerCase() === 'pendiente';
            return {
              id,
              ids: value.ids,
              title: `Reserva ${id}`,
              start: value.start,
              end: value.end,
              resourceId: value.cottage_id,
              backgroundColor: isPending ? '#FBBF24' : '#2563EB',
              editable: true,
              type: 'reserva',
              email: value.email,
              name: value.name,
              phone: value.phone,
              status: value.status
            };
          }
        );
        const blockResponse = await fetch('/api/getBlocks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value: 1 })
        });
        const blockData = await blockResponse.json();
        setResources(cottageResources);
        setEvents([...calendarEvents, ...blockData.data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);

  const handleEventClick = (clickInfo: any) => {
    const evento = clickInfo.event;
    const tipo = evento.extendedProps.type;

    if (tipo === 'bloqueo') {
    } else if (tipo === 'reserva') {
    }

    setSelectedEvent(evento);
    setEventModalOpen(true);
  };

  const handleEventDrop = async (info: any) => {
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
        if (response.ok) {
          await Swal.fire('Guardado', 'La reservación fue actualizada correctamente.', 'success');
        } else {
          await Swal.fire('Error', 'La reservación no pudo ser actualizada', 'warning');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      info.revert();
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-1">
      <h1 className="text-2xl font-bold prueba">Reservaciones</h1>
      <p className="mt-2 text-gray-600">Mantenimiento de reservaciones</p>

      <EventModal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        eventData={selectedEvent}
        onConfirm={async () => {
          const eventoConfirmar = {
            id: selectedEvent.id,
            ids: selectedEvent.extendedProps.ids
          };
          const res = await fetch('/api/confirmReservation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventoConfirmar })
          });
          const result = await res.json();
          if (result.ok) {
            Swal.fire('Confirmado', 'La reservación fue creada correctamente.', 'success');
            setTimeout(() => window.location.reload(), 1900);
          } else {
            Swal.fire('Error', 'No se pudo confirmar la reservacion.', 'error');
          }
          setEventModalOpen(false);
        }}
        onEdit={() => {}}
        onDelete={async () => {
          const confirm = await Swal.fire({
            title: '¿Eliminar evento?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
          });
          if (confirm.isConfirmed) {
            const type = selectedEvent.extendedProps.type;
            const eventoAEliminar = {
              id: selectedEvent.id,
              ids: selectedEvent.extendedProps.ids
            };
            const endpoint = type === 'bloqueo' ? '/api/deleteBlocks' : '/api/deleteReservation';
            const res = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ eventoAEliminar })
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

      <BlockModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        cottages={resources}
        onSubmit={async (start, end, cottageId, description) => {

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
          } else {
            Swal.fire('Error', 'No se pudo guardar el bloqueo.', 'warning');
          }
        }}
      />

      <PriceModal isOpen={priceModalOpen} onClose={() => setPriceModalOpen(false)} />

      <button className="bg-green-600 hover:bg-green-700 transition px-8 py-3 my-5 mr-5 rounded-full text-white text-lg w-80 cursor-pointer" onClick={() => setModalOpen(true)}>Crear bloqueos</button>

      <button className="bg-green-600 hover:bg-green-700 transition px-8 py-3 my-5 mr-5 rounded-full text-white text-lg w-80 cursor-pointer" onClick={() => setPriceModalOpen(true)}>Gestionar precios</button>

      <button className="bg-green-600 hover:bg-green-700 transition px-8 py-3 my-5 mr-5 rounded-full text-white text-lg w-80 cursor-pointer">Control ChatBot</button>

      <FullCalendar
        height={600}
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        initialView="resourceTimelineMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'resourceTimelineMonth,resourceTimelineDay,resourceTimelineWeek'
        }}
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        resources={resources}
        events={events}
        slotDuration="12:00:00"
        eventDrop={handleEventDrop}
        eventClick={handleEventClick}
      />

      <button onClick={handleLogout} className="mt-10 w-40 px-4 py-2 bg-green-500 text-white rounded hover:bg-red-600">Cerrar sesión</button>
    </div>
  );
}
