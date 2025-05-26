"use client";

import React, { useState } from "react";
import VerificationForm from "../verificationForm/verificationForm";
import MyReservation from "../myReservation/myReservation";
import NoReservationFound from "../noReservationFound/noReservationFound";

const BookingInformation = () => {
  const [verified, setVerified] = useState(false);
  const [reservationData, setReservationData] = useState<any>(null);
  const [noMatch, setNoMatch] = useState(false);
  const [formReset, setFormReset] = useState(false);

  const handleVerify = (data: any) => {
    console.log("valor ?",data.ok)
  if (data.ok === "true") {
    setReservationData(data);
    setVerified(true);
    setNoMatch(false);
  } else {
    setReservationData(null);
    setVerified(false);
    setNoMatch(true);
  }
};


  const handleReset = () => {
    setVerified(false);
    setNoMatch(false);
    setReservationData(null);
    setFormReset(true);
    setTimeout(() => setFormReset(false), 100);
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-16 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        
        <div className="w-full lg:w-1/2 bg-white p-8 rounded-2xl shadow-md">
            <VerificationForm onVerify={handleVerify} resetSignal={formReset} />
        </div>

        <div className="w-full lg:w-1/2 bg-white p-8 rounded-2xl shadow-md">
          {verified && reservationData ? (
            <MyReservation data={reservationData} />
          ) : noMatch ? (
            <NoReservationFound onReset={handleReset} />
          ) : (
            <div className="h-full min-h-[300px]"></div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BookingInformation;
