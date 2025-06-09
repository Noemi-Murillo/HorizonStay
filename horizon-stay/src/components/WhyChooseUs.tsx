import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="w-full py-16 px-8 sm:px-20 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <div>
          <img
            src="\experiences\nature2.webp"
            alt="Naturaleza"
            className="w-30 h-40 mx-auto mb-4"
          />
          <h4 className="text-lg font-semibold mb-2">Ubicación Privilegiada</h4>
          <p className="text-gray-600 text-sm">
            Rodeadas de bosques, lagos y senderos naturales.
          </p>
        </div>
        <div>
          <img
            src="\experiences\fireplace.webp"
            alt="Acogedora"
            className="w-30 h-40 mx-auto mb-4"
          />
          <h4 className="text-lg font-semibold mb-2">Ambiente Acogedor</h4>
          <p className="text-gray-600 text-sm">
            Decoradas con estilo rústico y modernas comodidades.
          </p>
        </div>
        <div>
          <img
            src="/experiences/wifi.webp"
            alt="Wifi"
            className="w-30 h-40 mx-auto mb-4"
          />
          <h4 className="text-lg font-semibold mb-2">Conectividad</h4>
          <p className="text-gray-600 text-sm">WiFi incluido en todas nuestras cabañas.</p>
        </div>
        <div>
          <img
            src="/experiences/pet.webp"
            alt="Pet Friendly"
            className="w-30 h-40 mx-auto mb-4"
          />
          <h4 className="text-lg font-semibold mb-2">Pet Friendly</h4>
          <p className="text-gray-600 text-sm">Tu mascota es bienvenida sin cargos extra.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
