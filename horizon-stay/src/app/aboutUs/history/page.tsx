'use client'
import React from "react";
import { motion } from "framer-motion";
import { User, Home } from "lucide-react";

const eventos = [
  {
    fecha: "1998 - La primera idea",
    descripcion:
      "Don Ernesto, amante de la montaña y carpintero de vocación, decidió construir una pequeña cabaña con sus propias manos en un terreno heredado de su abuelo. Inspirado por la tranquilidad del bosque y la necesidad de reconectar con la naturaleza, comenzó a bosquejar los planos usando únicamente herramientas manuales."
  },
  {
    fecha: "2000 - La cabaña familiar",
    descripcion:
      "Tras dos años de trabajo, la primera cabaña fue terminada. Hecha principalmente con madera local, se convirtió en el refugio favorito de la familia durante los fines de semana. Muy pronto, amigos y vecinos comenzaron a interesarse en quedarse allí para desconectarse del bullicio de la ciudad."
  },
  {
    fecha: "2005 - Nace el proyecto turístico",
    descripcion:
      "Viendo el entusiasmo de los visitantes, Don Ernesto decidió ampliar el espacio. Con la ayuda de dos antiguos alumnos suyos de carpintería, levantaron dos cabañas más. Aunque el proceso era artesanal, el boca a boca atrajo a visitantes de distintas regiones."
  },
  {
    fecha: "2012 - Expansión y sostenibilidad",
    descripcion:
      "Ya con cinco cabañas en funcionamiento, el enfoque cambió hacia el turismo responsable. Se implementaron paneles solares, baños secos y senderos interpretativos. Además, se promovieron actividades de reforestación con cada estadía."
  },
  {
    fecha: "2022 - Modernización",
    descripcion:
      "Los hijos de Don Ernesto, ahora profesionales en turismo y tecnología, modernizaron la marca, crearon un sitio web con sistema de reservaciones en línea, y establecieron alianzas con operadores turísticos locales. Las cabañas mantienen su esencia rústica, pero ahora incluyen comodidades modernas y prácticas sostenibles."
  }
];

const HistoryCabins = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 mt-20">
      <motion.h1
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        🏞️ Historia de Nuestras Cabañas
      </motion.h1>

      <div className="relative border-l-4 border-green-400 ml-4 pl-6 space-y-10">
        {eventos.map((evento, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="absolute -left-6 top-1">
              <div className="bg-green-600 text-white rounded-full p-1">
                {index % 2 === 0 ? <User className="w-4 h-4" /> : <Home className="w-4 h-4" />}
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-1">{evento.fecha}</h3>
            <p className="text-gray-700 leading-relaxed">{evento.descripcion}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HistoryCabins;
