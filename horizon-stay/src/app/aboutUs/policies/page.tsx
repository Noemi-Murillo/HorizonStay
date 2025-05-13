'use client'
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const categorias = [
  {
    titulo: "Horarios",
    contenido: [
      "Check-in: A partir de las 2:00 p.m.",
      "Check-out: Hasta las 11:00 a.m.",
      "Salidas después del horario establecido podrían generar cargos adicionales."
    ]
  },
  {
    titulo: "Reservaciones y Pagos",
    contenido: [
      "Se requiere el pago del 50% del total al momento de hacer la reservación.",
      "El saldo restante debe pagarse al menos 48 horas antes del ingreso.",
      "Aceptamos pagos mediante transferencia bancaria, SINPE Móvil y tarjeta de crédito."
    ]
  },
  {
    titulo: "Políticas de Cancelación",
    contenido: [
      "Más de 7 días de anticipación: Reembolso completo.",
      "Entre 3 y 6 días antes del check-in: Reembolso del 50%.",
      "Menos de 72 horas: No hay reembolso."
    ]
  },
  {
    titulo: "Capacidad y Uso",
    contenido: [
      "El número de personas no debe exceder la capacidad indicada en la cabaña.",
      "No se permite la realización de fiestas o eventos sin previa autorización."
    ]
  },
  {
    titulo: "Mascotas",
    contenido: [
      "Se permite el ingreso de mascotas pequeñas (máximo 2 por cabaña), siempre bajo supervisión.",
      "Los dueños son responsables de cualquier daño o limpieza adicional."
    ]
  },
  {
    titulo: "Seguridad",
    contenido: [
      "Prohibido el uso de fuegos artificiales y fogatas en áreas no designadas.",
      "La administración no se hace responsable por objetos personales dejados en la cabaña."
    ]
  },
  {
    titulo: "Responsabilidad del Huésped",
    contenido: [
      "Cualquier daño a la propiedad será cargado al huésped responsable.",
      "Se espera comportamiento respetuoso hacia otros visitantes y el entorno natural."
    ]
  }
];

const Categoria = ({ titulo, contenido }: { titulo: string; contenido: string[] }) => {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="mb-4 border rounded-2xl overflow-hidden shadow-md transition-all">
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-full flex justify-between items-center px-5 py-4 bg-green-100 hover:bg-green-200 font-semibold text-lg text-left transition-colors"
      >
        {titulo}
        {abierto ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden px-6 py-4 bg-white text-gray-700"
          >
            <ul className="list-disc list-inside space-y-2">
              {contenido.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CabinPolicies = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">🏡 Políticas del Establecimiento</h1>
      <p className="text-sm text-gray-500 mb-6">Última actualización: 12-05-2025</p>
      {categorias.map((cat, i) => (
        <Categoria key={i} titulo={cat.titulo} contenido={cat.contenido} />
      ))}
    </div>
  );
};

export default CabinPolicies;