"use client";

import { useState } from "react";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import TicketSelection from "./pages/TicketSelection";
import AttendeeDetails from "./pages/AttendeeDetails";
import TicketReady from "./pages/TicketReady";

export default function Home() {
  const [step, setStep] = useState(1);
  const [ticketType, setTicketType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [attendeeData, setAttendeeData] = useState({
    name: "",
    email: "",
    photo: "",
    about: "",
  });

  const handleTicketSelectionNext = (type: string, qty: number) => {
    setTicketType(type);
    setQuantity(qty);
    setStep(2);
  };

  const handleAttendeeDetailsNext = (data: typeof attendeeData) => {
    setAttendeeData(data);
    setStep(3);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleBookAnother = () => {
    setStep(1);
    setTicketType("");
    setQuantity(1);
    setAttendeeData({
      name: "",
      email: "",
      photo: "",
      about: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#001a1a]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProgressBar step={step} />
        {step === 1 && <TicketSelection onNext={handleTicketSelectionNext} />}
        {step === 2 && (
          <AttendeeDetails
            onNext={handleAttendeeDetailsNext}
            onBack={handleBack}
          />
        )}
        {step === 3 && (
          <TicketReady
            ticketData={{
              ticketType,
              quantity,
              ...attendeeData,
            }}
            onBookAnother={handleBookAnother}
          />
        )}
      </main>
    </div>
  );
}
