"use client";

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
        <button className="bg-green-600 text-white py-2 px-4 rounded-xl shadow">
          Conoce más
        </button>
      </motion.div>
    </section>
  );
};

const PoolPage = () => {
  return (
    <ParallaxProvider>
      <div className="space-y-24 bg-gray-50">
        <Section
          title="Piscina de ensueño"
          description="Nada en nuestra piscina climatizada rodeada de naturaleza. Perfecta para toda la familia y abierta todo el año."
          image="/R.png"
          reverse
          bgColor="bg-white"
        />
        <Section
          title="Piscina para niños"
          description="Diversión asegurada en nuestra piscina diseñada especialmente para los más pequeños, con profundidad segura, juegos acuáticos y supervisión constante."
          image="/R.png"
          bgColor="bg-gray-50"
        />
      </div>
      <footer className="w-full bg-gray-800 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} Horizon Stay. Todos los derechos reservados.</p>
      </footer>
    </ParallaxProvider>
  );
};

export default PoolPage;

  