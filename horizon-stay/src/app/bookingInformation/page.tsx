"use client";

import React, { useState } from "react";
import VerificationForm from "../verificationForm/verificationForm";
import MyReservation from "../myReservation/myReservation";
import NoReservationFound from "../noReservationFound/noReservationFound";
import Swal from "sweetalert2";

const BookingInformation = () => {
  const [verified, setVerified] = useState(false);
  const [reservationData, setReservationData] = useState<any>(null);
  const [noMatch, setNoMatch] = useState(false);
  const [formReset, setFormReset] = useState(false);

  const handleVerify = (data: any) => {
    if (data && data.ok === true && data.reservationId) {
      setVerified(true);
      setReservationData(data);
      setNoMatch(false);
    } else {
      setVerified(false);
      setReservationData(null);
      setNoMatch(true);
    }

    setFormReset(true);
    setTimeout(() => setFormReset(false), 100);
  };

  const handleReset = () => {
    setVerified(false);
    setNoMatch(false);
    setReservationData(null);
    setFormReset(true);
    setTimeout(() => setFormReset(false), 100);
  };

  return (
    <main className="min-h-screen bg-[url('/cabins/Forest/6.png')] bg-center bg-no-repeat bg-cover animate-pan px-4 py-16">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 mt-10">
        
        <div className="w-full lg:w-1/2 backdrop-blur-xl bg-white/30 border border-white/20 p-8 rounded-2xl shadow-2xl">
          <VerificationForm onVerify={handleVerify} resetSignal={formReset} />
        </div>

        <div className="w-full lg:w-1/2 backdrop-blur-xl bg-white/30 border border-white/20 p-8 rounded-2xl shadow-2xl flex items-center justify-center">
          {verified && reservationData ? (
            <MyReservation data={reservationData} />
          ) : noMatch ? (
            <NoReservationFound onReset={handleReset} />
          ) : (
            <img
              src="/cabins/Forest/5.png"
              alt="Esperando verificación"
              className="max-h-[400px] w-auto rounded-xl shadow-md animate-breathing"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default BookingInformation;
