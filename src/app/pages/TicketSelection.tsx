// components/TicketSelection.tsx
import React, { useState } from "react";

interface TicketSelectionProps {
  onNext: (ticketType: string, quantity: number) => void;
}

const TicketSelection: React.FC<TicketSelectionProps> = ({ onNext }) => {
  const [ticketType, setTicketType] = useState<string>("regular");
  const [quantity, setQuantity] = useState<number>(1);

  const handleNext = () => {
    onNext(ticketType, quantity);
  };

  return (
    <div className="p-4 rounded-lg shadow-md bg-secondary text-text-light">
      {" "}
      {/* Dark background, light text */}
      <h2 className="text-lg font-semibold mb-4">Ticket Selection</h2>
      <div className="mb-4">
        <label htmlFor="ticketType" className="block text-sm font-bold mb-2">
          Ticket Type
        </label>
        <select
          id="ticketType"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
        >
          <option value="regular">Regular Access (Free)</option>
          <option value="vip">VIP Access ($50)</option>
          <option value="vvip">VVIP Access ($150)</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-bold mb-2">
          Number of Tickets
        </label>
        <input
          type="number"
          id="quantity"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min="1"
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default TicketSelection;
