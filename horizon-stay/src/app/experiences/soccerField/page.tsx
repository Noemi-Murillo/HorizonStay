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

const soccerFieldPage = () => {
  return (
    <ParallaxProvider>
      <div className="space-y-24 bg-gray-50 pb-20 pt-20">
      <Section
          title="Cancha de fútbol"
          description="Juega un partido inolvidable en nuestra cancha de césped sintético. Ideal para grupos, torneos y encuentros recreativos."
          image="/experiences/soccerField.png"
          reverse
          bgColor="bg-white"
        />
      </div>
      <footer className="w-full bg-gray-800 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} Horizon Stay. Todos los derechos reservados.</p>
      </footer>
    </ParallaxProvider>
  );
};

export default soccerFieldPage;
