'use client';

export default function ContactPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 mt-20">
      <div className="w-full md:w-1/2 p-10 bg-white shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-green-700">Envíanos un mensaje</h2>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre completo</label>
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
            <input
              type="cellpone"
              placeholder="Numero de telofono"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mensaje</label>
            <textarea
              placeholder="Escribe tu mensaje aquí..."
              className="w-full p-3 border border-gray-300 rounded-lg h-40 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">
            Enviar mensaje
          </button>
        </form>
      </div>

      <div className="w-full md:w-1/2 bg-gray-100 p-8 flex items-center justify-center">
        <div className="w-full h-96 md:h-full rounded-lg overflow-hidden shadow">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            style={{ border: 0 }}
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=9.379738322433523,-83.69147397183767&z=15&output=embed"
          />
        </div>
      </div>

    </div>
  );
}
