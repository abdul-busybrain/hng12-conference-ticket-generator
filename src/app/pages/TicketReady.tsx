"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import Image from "next/image";

interface TicketReadyProps {
  ticketData: {
    ticketType: string;
    quantity: number;
    name: string;
    email: string;
    photo: string;
    about: string;
  };
}

const TicketReady: React.FC<TicketReadyProps> = ({ ticketData }) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    try {
      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true, // Important if you're using images from different domains
      });
      const dataURL = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "conference-ticket.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating/downloading image:", error);
    }
  };

  // Simulate a barcode (replace with a real barcode generator if needed)
  const barcode = "234567 890126";

  return (
    <div className="p-4 rounded-lg shadow-md bg-secondary text-text-light flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Your Ticket is Booked!</h2>
      <p className="mb-2">Check your email for a copy or you can download:</p>

      <div
        ref={ticketRef}
        className="border border-gray-300 rounded-lg p-4 relative w-full max-w-md bg-primary" // Added max-w-md for size control and bg-primary
      >
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold">Techember Fest &quot;25</h3>
          <p className="text-sm text-gray-400">
            34 Rumens road, Ikoyi, Lagos
            <br />
            March 15, 2025 | 7:00 PM
          </p>
        </div>

        {/* Attendee Photo */}
        <div className="flex justify-center mt-4">
          {ticketData.photo && (
            <Image
              src={ticketData.photo}
              alt="Attendee"
              className="rounded-full w-24 h-24 object-cover border-2 border-accent" // Added accent border
            />
          )}
        </div>

        {/* Attendee Details */}
        <div className="mt-4 text-center">
          <p>
            <span className="font-semibold">Name:</span> {ticketData.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {ticketData.email}
          </p>
          <p>
            <span className="font-semibold">Ticket Type:</span>{" "}
            {ticketData.ticketType}
          </p>
          <p>
            <span className="font-semibold">Ticket for:</span>{" "}
            {ticketData.quantity}
          </p>
          <p>
            <span className="font-semibold">About:</span> {ticketData.about}
          </p>
        </div>

        {/* Barcode */}
        <div className="mt-6 text-center">
          <div className="flex justify-center">
            <svg width="200" height="50">
              {/* Placeholder for barcode - replace with a real barcode generator */}
              <text x="10" y="30" fontSize="20" fill="black">
                {barcode}
              </text>
            </svg>
          </div>
          <p className="text-xs text-gray-400">234567 890126</p>
        </div>
      </div>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 flex items-center space-x-2"
        onClick={downloadTicket}
      >
        <Download className="h-5 w-5" />
        <span>Download Ticket</span>
      </button>
    </div>
  );
};

export default TicketReady;
