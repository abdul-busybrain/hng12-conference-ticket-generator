"use client";

import { useRef } from "react";
import { Download } from "lucide-react";
import Image from "next/image";
import html2canvas from "html2canvas";
import type React from "react"; // Added import for React

interface TicketData {
  ticketType: string;
  quantity: number;
  name: string;
  email: string;
  photo: string;
  about: string;
  image?: string;
}

interface TicketReadyProps {
  ticketData: TicketData;
  onBookAnother: () => void;
}

const TicketReady: React.FC<TicketReadyProps> = ({
  ticketData,
  onBookAnother,
}) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    try {
      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
      });
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "techember-ticket.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating ticket:", error);
    }
  };

  return (
    <div className="bg-[#002626] p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Your Ticket is Ready!
        </h2>
        <p className="text-gray-400 text-lg">
          Please review your details below
        </p>
      </div>

      <div className="space-y-6">
        {(ticketData.image || ticketData.photo) && (
          <div>
            <Image
              src={ticketData.image || ticketData.photo || "/placeholder.svg"}
              alt="Attendee"
              width={96}
              height={96}
              className="w-24 h-24 rounded-lg mx-auto border-2 border-[#00cccc] object-cover"
            />
          </div>
        )}

        <div className="space-y-2 text-left mb-6">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-400 text-sm">Enter your name</p>
              <p className="text-white">{ticketData.name}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Enter your email *</p>
              <p className="text-white">{ticketData.email}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Ticket Type</p>
            <p className="text-white">{ticketData.ticketType}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Ticket for</p>
            <p className="text-white">{ticketData.quantity}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Special request?</p>
            <p className="text-white">{ticketData.about || "None"}</p>
          </div>
        </div>

        <div className="pt-6 border-t border-dashed border-[#004444]">
          <div className="flex justify-center">
            <svg width="200" height="50">
              <rect x="0" y="0" width="200" height="50" fill="none" />
              <text x="10" y="30" fill="white" fontSize="16">
                234567 890126
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={onBookAnother}
          className="flex-1 px-8 py-3 rounded-lg border border-[#004444] text-gray-300 hover:bg-[#002626]"
        >
          Book Another Ticket
        </button>
        <button
          onClick={downloadTicket}
          className="flex-1 px-8 py-3 rounded-lg bg-[#00cccc] text-black font-medium hover:bg-[#00dddd] flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketReady;
