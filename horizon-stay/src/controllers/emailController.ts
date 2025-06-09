import { sendReservationEmail } from '@/models/emailModel';
import { logoHorizonStay, placeImage } from '@/utils/emailImages'
import { ReservationData } from "@/hooks/useReservationForm"

export async function notifyClient(reservationData: ReservationData) {

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Confirmación de Reserva - Horizon Stay</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">

  <!-- Logo pequeño -->
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="" alt="Horizon Stay Logo" style="max-width: 150px;">
  </div>

  <!-- Imagen grande del complejo -->
  <div style="text-align: center; margin-bottom: 30px;">
    <img src="" alt="Complejo Horizon Stay" style="width: 100%; max-width: 600px; border-radius: 8px;">
  </div>

  <!-- Texto de agradecimiento -->
  <div style="text-align: center; margin-bottom: 20px; font-weight: bold; font-size: 20px;">
    <p>¡Muchas gracias por reservar con nosotros!</p>
    <p>Esperamos tu llegada, acá están los detalles de tu reservación.</p>
  </div>

  <!-- Detalles de la reservación -->
  <div style="margin: 0 auto; max-width: 600px; background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
    <h2 style="color: #000000; text-align: center; font-size: 32px;">Su reservación:</h2>
    <p><strong>Número de Reservación:</strong> ${reservationData.reservationId}</p>
    <p><strong>Nombre:</strong> ${reservationData.name}</p>
    <p><strong>Check-in:</strong> ${reservationData.start}</p>
    <p><strong>Check-out:</strong> ${reservationData.end}</p>
    <p><strong>Cabaña:</strong> ${reservationData.cottageName}</p>
    <p><strong>Precio total:</strong> ${reservationData.total_price}</p>

    <div style="text-align: center; margin-bottom: 20px; font-weight: bold; font-size: 12px;">
      <p>¡Gracias por tu reserva! Nos pondremos en contacto contigo unos días antes de tu llegada para coordinar el pago y asegurarnos de que todo esté listo para tu estadía.</p>
      
   </div>
    <!-- Botón -->
    <div style="text-align: center; margin-top: 60px;">
      <a href="https://www.horizonstay.com" target="_blank" style="background-color: #105c49; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">
        Visita nuestra página web →
      </a>
    </div>
  </div>

  <!-- Información de contacto -->
  <div style="text-align: center; margin-top: 30px; font-size: 14px; color: #555;">
    <p>Contacto: <a href="mailto:horizon.stay.complex@gmail.com">horizon.stay.complex@gmail.com</a></p>
    <p>Sitio web: <a href="https://www.horizonstay.com" target="_blank">www.horizonstay.com</a></p>
  </div>

</body>
</html>

`

  return sendReservationEmail(reservationData, 'Confirmación de reserva.', html);
}
