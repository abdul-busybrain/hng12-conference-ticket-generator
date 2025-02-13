"use client";

import React, { useState } from "react";
import ProgressBar from "./components/ProgressBar";
import TicketSelection from "./pages/TicketSelection";
import AttendeeDetails from "./pages/AttendeeDetails";
import TicketReady from "./pages/TicketReady";
import Header from "./components/Header";

const Home: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [ticketType, setTicketType] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [attendeeData, setAttendeeData] = useState<{
    name: string;
    email: string;
    photo: string;
    about: string;
  }>({ name: "", email: "", photo: "", about: "" });

  const handleTicketSelectionNext = (type: string, qty: number) => {
    setTicketType(type);
    setQuantity(qty);
    setStep(2);
  };

  const handleAttendeeDetailsNext = (data: {
    name: string;
    email: string;
    photo: string;
    about: string;
  }) => {
    setAttendeeData(data);
    setStep(3);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-primary text-text-light">
        <ProgressBar step={step} />
        {step === 1 && <TicketSelection onNext={handleTicketSelectionNext} />}
        {step === 2 && <AttendeeDetails onNext={handleAttendeeDetailsNext} />}
        {step === 3 && (
          <TicketReady ticketData={{ ticketType, quantity, ...attendeeData }} />
        )}
      </div>
    </>
  );
};

export default Home;
