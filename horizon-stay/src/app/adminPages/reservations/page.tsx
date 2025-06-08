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

        const cottageResources = Object.entries(data.data.cottages).map(
          ([id, value]: [string, any]) => ({
            id: id,
            title: value.name
          })
        );

        const calendarEvents = Object.entries(data.data.reservations).map(
          ([id, value]: [string, any]) => ({
            id: id, // importante si quieres identificar la reserva al moverla
            title: `Reserva ${id}`,
            start: value.start,
            end: value.end,
            resourceId: value.cottage_id
          })
        );

        setResources(cottageResources);
        setEvents(calendarEvents);

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

      }


    } else {

      info.revert();
      console.log("modificacion cancelada")



    }

  };

  return (
    <div>
      <h1 className="text-2xl font-bold prueba">Reservaciones</h1>
      <p className="mt-2 text-gray-600">Mantenimiento de reservaciones</p>

      <BlockModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        cottages={resources}
        onSubmit={(start, end, cottageId) => {
          console.log("Bloqueo creado:", { start, end, cottageId });
          // Aquí haces la llamada API si quieres guardar el bloqueo
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
        eventDrop={handleEventDrop} // ← Aquí capturas los arrastres
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
