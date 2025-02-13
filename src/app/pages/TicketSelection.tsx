'use client'

import { Button, Select, Typography, Form } from "antd";
import React, { useState } from "react";

const { Title, Text, Paragraph } = Typography;

interface TicketSelectionProps {
  onNext: (ticketType: string, quantity: number) => void;
}

const TicketSelection: React.FC<TicketSelectionProps> = ({ onNext }) => {
  const [ticketType, setTicketType] = useState<string>("regular");
  const [quantity, setQuantity] = useState<number>(1);

  const handleNext = () => {
    onNext(ticketType, quantity);
  };

  // Create array of numbers 1-10 for quantity options
  const quantityOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} ticket${i + 1 > 1 ? 's' : ''}`
  }));

  return (
    <div className="p-4 rounded-lg shadow-md bg-secondary text-text-light">
      <Title level={2}>Techember Fest &quot;25</Title>
      <Paragraph>
        Join us for an unforgettable experience at <br /> Hawan Nassarawa!
        Secure your spot now. <br />
        Kofar Nassarawa || March 15, 2025 || 7:00 PM
      </Paragraph>
      
      <Form layout="vertical">
        <Form.Item 
          label={<Text strong>Select Ticket Type</Text>}
          className="mb-4"
        >
          <Select
            value={ticketType}
            onChange={(value) => setTicketType(value)}
            className="w-full"
          >
            <Select.Option value="regular">Regular Access (Free)</Select.Option>
            <Select.Option value="vip">VIP Access ($50)</Select.Option>
            <Select.Option value="vvip">VVIP Access ($150)</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item 
          label={<Text strong>Number of Tickets</Text>}
          className="mb-4"
        >
          <Select
            value={quantity}
            onChange={(value) => setQuantity(value)}
            className="w-full"
          >
            {quantityOptions.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <div className="flex justify-between">
          <Button ghost>Cancel</Button>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default TicketSelection;