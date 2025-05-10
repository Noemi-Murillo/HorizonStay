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
      </motion.div>
    </section>
  );
};

const RestaurantPage = () => {
  return (
    <ParallaxProvider>
      <div className="space-y-24 bg-gray-50">
        <Section
          title="Restaurante Gourmet"
          description="Déjate sorprender por nuestro restaurante gourmet, donde cada plato es una experiencia. Ofrecemos cocina internacional con ingredientes frescos y una vista que deleita. Vive momentos inolvidables en un ambiente sofisticado, con atención al detalle y servicio personalizado."
          image="/restaurant/restaurant.png"
          bgColor="bg-white"
        />
        <Section
          title="Ambiente acogedor"
          description="Nuestro restaurante ofrece un entorno cálido y elegante, ideal para cenas románticas, reuniones familiares o eventos especiales. Disfruta de una atmósfera tranquila con iluminación tenue, decoración cuidada y música suave que complementan perfectamente cada comida."
          image="/restaurant/bar.png"
          reverse
          bgColor="bg-gray-50"
        />
        <Section
          title="Ingredientes frescos"
          description="Cada platillo es preparado con productos locales frescos, seleccionados cuidadosamente para brindar el mejor sabor y calidad. Trabajamos con productores regionales para garantizar ingredientes de temporada y fomentar la sostenibilidad alimentaria."
          image="/restaurant/food.png"
          bgColor="bg-white"
        />
        <Section
          title="Variedad gastronómica"
          description="Contamos con un menú diverso que incluye opciones vegetarianas, veganas, sin gluten y para niños. Desde desayunos energizantes hasta cenas exclusivas, tenemos algo para cada gusto y momento del día."
          image="/restaurant/gastronomicVariety.png"
          reverse
          bgColor="bg-gray-50"
        />
        <Section
          title="Vistas panorámicas"
          description="Disfruta de una experiencia culinaria con vistas espectaculares al bosque y las montañas. Nuestro restaurante combina sabores exquisitos con un entorno natural para que cada comida sea memorable."
          image="/restaurant/balcony.png"
          bgColor="bg-white"
        />
      </div>
      <footer className="w-full bg-gray-800 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} Horizon Stay. Todos los derechos reservados.</p>
      </footer>
    </ParallaxProvider>
  );
};

export default RestaurantPage;
