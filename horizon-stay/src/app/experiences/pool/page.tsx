"use client";

import { useRouter } from 'next/navigation';
import { ParallaxProvider } from "react-scroll-parallax";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Section = ({ title, description, image, reverse, bgColor }: {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  bgColor?: string;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const router = useRouter();

  return (
    <section
      className={`${bgColor ?? "bg-white"} flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 px-6 py-16 max-w-6xl mx-auto`}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 w-full"
      >
        <img src={image} alt={title} className="rounded-2xl shadow-xl w-full mb-4" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:w-1/2 w-full"
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-4">{description}</p>
        <button
          onClick={() => router.push('/ReservationForm')}
          className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-md text-white text-lg inline-block" >
          Reserva Ahora
        </button>
      </motion.div>
    </section>
  );
};

const PoolPage = () => {
  return (
    <ParallaxProvider>
      <div className="bg-gray-50 ">
        <div className="pt-20 pb-20 space-y-10">
          <Section
            title="Piscina de ensueño"
            description="Nada en nuestra piscina climatizada rodeada de naturaleza. Perfecta para toda la familia y abierta todo el año."
            image="/pool/mainPool.png"
            reverse
            bgColor="bg-white"
          />
          <Section
            title="Piscina para niños"
            description="Diversión asegurada en nuestra piscina diseñada especialmente para los más pequeños, con profundidad segura, juegos acuáticos y supervisión constante."
            image="/pool/RestaurantPool.png"
            bgColor="bg-white"
          />
          <Section
            title="Piscina en tu cabañá"
            description="Disfruta tu estadia en la pisicina cerca de tu cabaña"
            image="/pool/cabinPool.png"
            bgColor="bg-white"
          />
        </div>
      </div>
      <footer className="w-full bg-gray-800 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} Horizon Stay. Todos los derechos reservados.</p>
      </footer>
    </ParallaxProvider >
  );
};

export default PoolPage;

