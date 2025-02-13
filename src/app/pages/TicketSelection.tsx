"use client";

import type React from "react";
import { useState } from "react";
import { Select } from "antd";
import { MapPin } from "lucide-react";

interface TicketSelectionProps {
  onNext: (ticketType: string, quantity: number) => void;
}

interface TicketType {
  id: string;
  name: string;
  price: string | number;
  remaining: number;
}

const TicketSelection: React.FC<TicketSelectionProps> = ({ onNext }) => {
  const [selectedTicket, setSelectedTicket] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const ticketTypes: TicketType[] = [
    { id: "regular", name: "REGULAR ACCESS", price: "Free", remaining: 20 },
    { id: "vip", name: "VIP ACCESS", price: 50, remaining: 20 },
    { id: "vvip", name: "VVIP ACCESS", price: 150, remaining: 20 },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-[#002626] rounded-2xl">
      <div className="bg-[#001a1a] rounded-xl p-8 text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Techember Fest &quot;25
        </h1>
        <p className="text-gray-300 mb-4">
          Join us for an unforgettable experience at
          <br />
          Hawan Nassarawa! Secure your spot now.
        </p>
        <div className="flex items-center justify-center text-gray-400">
          <MapPin className="w-4 h-4 mr-2" />
          <span>Kofar Nassarawa || March 15, 2025 | 7:00 PM</span>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-white text-lg">Select Ticket Type:</h3>
        <div className="grid gap-4 grid-cols-2">
          {ticketTypes.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket.id)}
              className={`p-4 rounded-xl cursor-pointer transition-all ${
                selectedTicket === ticket.id
                  ? "bg-[#004444] border-[#00cccc] border"
                  : "bg-[#001a1a] border border-transparent hover:border-[#004444]"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-white font-medium">{ticket.name}</h4>
                  <p className="text-sm text-[#00cccc]">
                    {ticket.remaining} left!
                  </p>
                </div>
                <span className="text-xl font-bold text-white">
                  {typeof ticket.price === "number"
                    ? `$${ticket.price}`
                    : ticket.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="text-white text-lg">Number of Tickets</h3>
          <Select
            defaultValue={1}
            onChange={(value) => setQuantity(value)}
            className="w-full bg-[#001a1a]"
            options={Array.from({ length: 10 }, (_, i) => ({
              value: i + 1,
              label: `${i + 1} ticket${i + 1 > 1 ? "s" : ""}`,
            }))}
          />
        </div>

        <div className="flex justify-between pt-4">
          <button className="px-8 py-2 rounded-lg border border-[#004444] text-gray-300 hover:bg-[#002626]">
            Cancel
          </button>
          <button
            onClick={() => onNext(selectedTicket, quantity)}
            disabled={!selectedTicket}
            className="px-8 py-2 rounded-lg bg-[#00cccc] text-black font-medium hover:bg-[#00dddd] disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;
