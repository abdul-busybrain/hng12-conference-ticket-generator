import React from "react";
import Progression from "../components/Progression";
import { Button } from "antd";
import html2canvas from "html2canvas";

interface TicketReadyProps {
  ticketInfo: { type: string; quantity: number };
  attendeeInfo: { photoUrl: string; name: string; email: string };
}

const TicketReady: React.FC<TicketReadyProps> = ({
  ticketInfo,
  attendeeInfo,
}) => {
  const downloadTicket = () => {
    const ticket = document.getElementById("ticket");
    if (ticket) {
      html2canvas(ticket).then((canvas) => {
        const link = document.createElement("a");
        link.download = "ticket.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <section className="border border-[#197686] rounded-2xl p-7">
      <Progression />
      <div>
        <h3>Ticket information</h3>
        <p>Type: {ticketInfo.type}</p>
        <p>Quantity: {ticketInfo.quantity}</p>

        <h3>Attendee information</h3>
        <p>Name: {attendeeInfo.name}</p>
        <p>Email: {attendeeInfo.email}</p>
        <p>Photo: {attendeeInfo.photoUrl}</p>
      </div>

      <Button onClick={downloadTicket}>download ticket</Button>
    </section>
  );
};

export default TicketReady;
