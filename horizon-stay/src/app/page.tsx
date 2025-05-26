import CabinList from '@/components/cabinCompontes/CabinList';
import WhyChooseUs from '@/components/WhyChooseUs';
import ChatWidget from '@/components/chatbot/ChatWidget';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white font-sans">
      <div className="grid grid-rows-[auto_1fr_auto]">
        <section className="relative w-full h-[70vh] bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: "url('/cabins/horizonStay.png')" }}>
          <div className="bg-black/50 w-full h-full absolute top-0 left-0" />
          <div className="relative z-10 text-center text-white px-6 max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Escápate a la Naturaleza</h1>
            <p className="text-lg sm:text-xl mb-6 font-bold">Encuentra tu cabaña perfecta para tu próximo viaje.</p>
            <button className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-full text-white text-lg">
              Reserva Ahora
            </button>
          </div>
        </section>

        <section className="w-full min-h-screen bg-green-50 py-16">
        <div className="max-w-screen-xl mx-auto px-8 sm:px-20 flex flex-col md:flex-row items-start gap-10">
          <div className="w-full md:w-1/3">
            <h2 className="text-4xl font-bold mb-4">🌲 Cabañas en el Bosque</h2>
            <p className="text-gray-700">
              Escondites tranquilos rodeados de árboles, perfectos para relajarse lejos del ruido.
            </p>
          </div>
          <div className="w-full md:w-2/3">
            <CabinList type="forest" />
          </div>
        </div>
      </section>

      <section className="w-full min-h-screen bg-blue-50 py-16">
        <div className="max-w-screen-xl mx-auto px-8 sm:px-20 flex flex-col md:flex-row items-start gap-10">
          <div className="w-full md:w-1/3">
            <h2 className="text-4xl font-bold mb-4">🌊 Cabañas del Lago</h2>
            <p className="text-gray-700">
              Cabañas con impresionantes vistas al lago, ideales para una escapada tranquila de fin de semana.
            </p>
          </div>
          <div className="w-full md:w-2/3">
            <CabinList type="lake" />
          </div>
        </div>
      </section>

      <section className="w-full min-h-screen bg-gray-50 py-16">
        <div className="max-w-screen-xl mx-auto px-8 sm:px-20 flex flex-col md:flex-row items-start gap-10">
          <div className="w-full md:w-1/3">
            <h2 className="text-4xl font-bold mb-4">🏔️ Cabañas de Montaña</h2>
            <p className="text-gray-700">
              Escápate a las alturas. Descubre la serenidad de las cabañas de montaña, rodeadas de aire fresco y vistas panorámicas.
            </p>
          </div>
          <div className="w-full md:w-2/3">
            <CabinList type="mountain" />
          </div>
        </div>
      </section>

        <section className="w-full py-16 px-8 sm:px-20 bg-white">
          <WhyChooseUs/>
        </section>

        <footer className="w-full bg-gray-800 text-white text-center py-6">
          <p>&copy; {new Date().getFullYear()} Horizon Stay. Todos los derechos reservados.</p>
        </footer>
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        <ChatWidget />
      </div>
    </div>
  );
}
