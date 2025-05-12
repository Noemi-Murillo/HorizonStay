import { transporter } from '@/lib/emailTransport';

export async function sendReservationEmail(reservationData: any, sub: string, body: string) {
  return transporter.sendMail({
    from: `"Horizon Stay" <${process.env.EMAIL_USER}>`,
    to: reservationData.email,
    subject: sub,
    html: body
  });
}
