import CabinList from '../components/cabinCompontes/CabinList';
import WhyChooseUs from '../components/WhyChooseUs';

export default function Home() {
  return (
<div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-white font-sans">
      <section className="relative w-full h-[70vh] bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: "url('/images/cabana-hero.jpg')" }}>
        <div className="bg-black/50 w-full h-full absolute top-0 left-0" />
        <div className="relative z-10 text-center text-white px-6 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Escápate a la Naturaleza</h1>
          <p className="text-lg sm:text-xl mb-6">Encuentra tu cabaña perfecta para tu próximo viaje.</p>
          <button className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-full text-white text-lg">
            Reserva Ahora
          </button>
        </div>
      </section>

      <section className="w-full py-16 px-8 sm:px-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">Cabañas Destacadas</h2>
        <CabinList/>
      </section>

      <section className="w-full py-16 px-8 sm:px-20 bg-white">
        <WhyChooseUs/>
      </section>

      <footer className="w-full bg-gray-800 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} Horizon Stay. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
