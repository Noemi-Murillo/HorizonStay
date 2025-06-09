type ToolInput = Record<string, any>;
type ToolResponse = { content: { type: "text"; text: string }[] };

export async function infoTool(input: { pregunta: string }): Promise<ToolResponse> {
  return {
    content: [
      {
        type: "text",
        text: `🔍 Estoy pensando en cómo responder a: "${input.pregunta}"`,
      },
    ],
  };
}

export async function createReservationTool(input: {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  guests: number;
  cottage: string;
  start: string;
  end: string;
  notes?: string;
}): Promise<ToolResponse> {
  try {
    // 1️⃣ Crear reserva
    const res = await fetch("/api/createReservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const result = await res.json();

    if (!result.ok || !result.id) {
      throw new Error("No se pudo crear la reserva.");
    }

    // 2️⃣ Enviar correo
    const emailPayload = {
      reservationId: result.id,
      name: input.name,
      email: input.email,
      start: input.start,
      end: input.end,
      notes: input.notes || "",
      cottage: input.cottage,
    };

    const emailRes = await fetch("/api/emailReservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailPayload),
    });

    const emailResult = await emailRes.json();
    if (!emailResult.ok) {
      throw new Error("Error al enviar el correo.");
    }

    return {
      content: [
        {
          type: "text",
          text: `✅ ¡Reserva creada y correo enviado exitosamente! ID: ${result.id}`,
        },
      ],
    };
  } catch (err) {
    console.error("❌ Error en createReservationTool:", err);
    return {
      content: [
        {
          type: "text",
          text: "❌ Error interno al crear la reserva o enviar el correo.",
        },
      ],
    };
  }
}
