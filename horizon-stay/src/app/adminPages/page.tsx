'use client';

import '@/app/styles/reservation.css';
import { useEffect, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import Swal from 'sweetalert2';
import BlockModal from "@/components/reservationComponents/blockModal";
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebaseClient';
import { signOut } from 'firebase/auth';
import EventModal from '@/components/reservationComponents/modalEvent'
import EditEventModal from '@/components/reservationComponents/editEventModal'
import { Timer } from 'lucide-react';

export default function Reservations() {

  const [events, setEvents] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
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
          console.error("Datos faltantes en la respuesta", data);
          return;
        }
        console.log(data.data.reservations)
        const cottageResources = Object.entries(data.data.cottages).map(
          ([id, value]: [string, any]) => ({
            id: id,
            title: value.name
          })
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
        console.log(blockData)
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
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEventClick = (clickInfo: any) => {
    const evento = clickInfo.event;
    const tipo = evento.extendedProps.type;

    if (tipo === 'bloqueo') {
      console.log("Este es un BLOQUEO");
    } else if (tipo === 'reserva') {
      console.log("Este es una RESERVA");
    }

    setSelectedEvent(evento);
    setEventModalOpen(true);
  };

  const handleEventDrop = async (info: any) => {
    const id = info.event.id;
    const start = info.event.startStr;

    const getEndDateAtNoon = (endStr: string) => {
      const endDate = new Date(endStr);
      endDate.setHours(12, 0, 0, 0); // 12:00 p.m.
      return endDate.toISOString();
    };

    const end = getEndDateAtNoon(info.event.endStr);


    const resource = info.event.getResources()[0]?.id;




    console.log('Evento movido:');
    console.log('ID:', id);
    console.log('Inicio:', start);
    console.log('Fin:', end);
    console.log('Cabaña:', resource);


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
          body: JSON.stringify({
            id,
            start,
            end,
            cottage_id: resource
          })
        });


        console.log("llamada API", response);

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
      console.log("modificacion cancelada")



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


          const type = selectedEvent.extendedProps.type;

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
            setTimeout(() => {
              window.location.reload();
            }, 1900);
          } else {
            Swal.fire('Error', 'No se pudo confirmar la reservacion.', 'error');
          }

          setEventModalOpen(false);
        }}
        onEdit={() => {
          // setEventModalOpen(false);
          // setEditModalOpen(true);

        }}
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

            if (type === "bloqueo") {

              const res = await fetch('/api/deleteBlocks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventoAEliminar })
              });
              const result = await res.json();
              if (result.ok) {
                Swal.fire('Eliminado', 'El bloqueo fue eliminado correctamente.', 'success');
                setEventModalOpen(false);

                setEvents(prev => prev.filter(e => e.id !== selectedEvent.id));
              } else {
                Swal.fire('Error', 'No se pudo eliminar el bloqueo.', 'error');
              }

            }
            else {

              const res = await fetch('/api/deleteReservation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventoAEliminar })
              });
              const result = await res.json();
              if (result.ok) {
                Swal.fire('Eliminado', 'La resevación fue eliminada correctamente.', 'success');
                setEventModalOpen(false);

                setEvents(prev => prev.filter(e => e.id !== selectedEvent.id));
              } else {
                Swal.fire('Error', 'No se pudo eliminar la reserva.', 'error');
              }

            }

          }
        }}
      />
      <BlockModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        cottages={resources}
        onSubmit={async (start, end, cottageId, description) => {
          console.log("Intentando crear bloqueo:", { start, end, cottageId, description });

          const overlapExists = events.some((event) => {
            const isSameCottage = event.resourceId === cottageId;

            const eventStart = new Date(event.start).getTime();
            const eventEnd = new Date(event.end).getTime();
            const blockStart = new Date(start).getTime();
            const blockEnd = new Date(end).getTime();

            const overlaps = blockStart < eventEnd && blockEnd > eventStart;

            return isSameCottage && overlaps;
          });

          if (overlapExists) {
            Swal.fire('Error', 'Ya existe una reserva o bloqueo en ese rango de fechas para esta cabaña.', 'error');
            return;
          }


          const response = await fetch('/api/createBlock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              start,
              end,
              cottageId,
              description
            })
          });

          if (response.ok) {
            Swal.fire({
              title: "¡Éxito!",
              text: 'Se ha guardado el bloqueo de manera exitosa.',
              icon: "success",
              timer: 1800,
            })

          } else {
            Swal.fire('Error', 'Ocurrió un error al registrar el bloqueo.', 'warning');
          }
        }}
      />



      <button className="bg-green-600 hover:bg-green-700 transition px-8 py-3 my-5  mr-[35px] rounded-full text-white text-lg w-80 cursor-pointer" onClick={() => setModalOpen(true)}>
        Crear bloqueos
      </button>

      <button className="bg-green-600 hover:bg-green-700 transition px-8 py-3 my-5   mr-[35px] rounded-full text-white text-lg w-80 cursor-pointer">
        Generar predicciones
      </button>

      <button className="bg-green-600 hover:bg-green-700 transition px-8 py-3 my-5   mr-[20px] rounded-full text-white text-lg w-80 cursor-pointer">
        Control ChatBot
      </button>



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


      <button
        onClick={handleLogout}
        className="mt-10 w-40 px-4 py-2 bg-green-500 text-white rounded hover:bg-red-600"
      >
        Cerrar sesión
      </button>

    </div>
  );
}
