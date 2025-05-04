"use client";

import React, { useState } from "react";
import VerificationForm from "../verificationForm/verificationForm";
import MyReservation from "../myReservation/myReservation";

const BookingInformation = () => {
  const [verified, setVerified] = useState(false);
  const [reservationData, setReservationData] = useState<any>(null);

  const handleVerify = (data: any) => {
    setReservationData(data);
    setVerified(true);
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-16 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-1/2 bg-white p-8 rounded-2xl shadow-md">
          <VerificationForm onVerify={handleVerify} />
        </div>

        {verified && reservationData && (
          <div className="w-full lg:w-1/2 bg-white p-8 rounded-2xl shadow-md">
            <MyReservation data={reservationData} />
          </div>
        )}
      </div>
    </main>
  );
};

export default BookingInformation;