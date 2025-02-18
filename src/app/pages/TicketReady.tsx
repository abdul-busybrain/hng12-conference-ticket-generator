"use client";

import { useRef, useState } from "react";
import { Download } from "lucide-react";
import { CldImage } from "next-cloudinary";
import html2canvas from "html2canvas";

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
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    setIsDownloading(true);

    try {
      const canvas = await html2canvas(ticketRef.current, {
        useCORS: true,
        scale: 2, // Increase resolution
        logging: false, // Disable logging
        allowTaint: true, // Allow cross-origin images
        backgroundColor: "#002626", // Match background color
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
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-[#002626] p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Your Ticket is Booked!
        </h2>
        <p className="text-gray-400 text-lg">
          Check your email for a copy or you can <strong>download</strong>
        </p>
      </div>

      <div ref={ticketRef} className="space-y-6 bg-[#001a1a] p-6 rounded-lg">
        {(ticketData.image || ticketData.photo) && (
          <div className="flex justify-center">
            <CldImage
              src={ticketData.image || ticketData.photo}
              alt="Attendee"
              width={96}
              height={96}
              crop="fill"
              className="rounded-lg border-2 border-[#00cccc] object-cover"
            />
          </div>
        )}

        <div className="space-y-2 text-left mb-6">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-white">{ticketData.name}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white">{ticketData.email}</p>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Ticket Type</p>
            <p className="text-white">{ticketData.ticketType}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Quantity</p>
            <p className="text-white">{ticketData.quantity}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Special request</p>
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

      <div className="flex flex-col gap-3 lg:flex-row lg:justify-between pt-4">
        <button
          onClick={onBookAnother}
          className="flex-1 px-8 py-3 rounded-lg border border-[#004444] text-gray-300 hover:bg-[#002626]"
        >
          Book Another Ticket
        </button>
        <button
          onClick={downloadTicket}
          disabled={isDownloading}
          className="flex-1 px-8 py-3 rounded-lg bg-[#00cccc] text-black font-medium hover:bg-[#00dddd] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isDownloading ? (
            "Generating..."
          ) : (
            <>
              <Download className="w-5 h-5" />
              Download Ticket
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TicketReady;
