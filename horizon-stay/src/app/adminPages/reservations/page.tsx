'use client';

import '@/app/styles/reservation.css';
import { useEffect, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

export default function Reservations() {

  const [events, setEvents] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/checkReservations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value: 1 })
        });

        const data = await response.json();
        console.log('prueba', data.data)
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



  return (
    <div>
      <h1 className="text-2xl font-bold prueba">Reservaciones</h1>
      <p className="mt-2 text-gray-600">Mantenimiento de reservaciones</p>

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
      />
    </div>
  );
}
