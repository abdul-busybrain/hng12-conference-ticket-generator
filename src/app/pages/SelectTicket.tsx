"use client";
import React from "react";
import Progression from "../components/Progression";
import { Button, Select } from "antd";

const { Option } = Select;

interface SelectTicketProps {
  onSelect: (type: string, quantity: number) => void;
}

const SelectTicket: React.FC<SelectTicketProps> = ({ onSelect }) => {
  const [selectType, setSelectType] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(1);

  const handleTypeSelect = (type: string) => {
    setSelectType(type);
    onSelect(type, quantity);
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
    onSelect(selectType, value);
  };

  return (
    <section className="border border-[#197686] rounded-2xl p-7">
      <div>
        <Progression />
        <div className="text-center p-16">
          <h1>Techember Fest &quot;25</h1>
          <p>
            Join us for an unforgettable experience at Hawan Nassarawa! <br />
            Secure your spot now. <br />
            Kofar Nassarawa || April 05, 2025 | 10:00 AM
          </p>
        </div>

        <hr className="my-4" />

        <div>
          <p> Select Ticket Type:</p>
          <div className="grid grid-cols-2 gap-4">
            {["Regular", "VIP", "VVIP"].map((type) => (
              <div
                key={type}
                className={`p-4 border rounded cursor-pointer ${
                  selectType === type ? "border-[#197686]" : ""
                }`}
                onClick={() => handleTypeSelect(type)}
              >
                <div className="flex justify-between">
                  <p className="uppercase">{type}</p>
                  <span>Free</span>
                </div>
                <p>20 left</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p>Number of Tickets:</p>
          <Select
            value={quantity}
            onChange={handleQuantityChange}
            className="bg-[#197686]  w-full border"
          >
            {[1, 4, 8, 16, 24, 36].map((num) => (
              <Option key={num} value={num}>
                {num}
              </Option>
            ))}
          </Select>
        </div>

        <div className="flex justify-between">
          <Button ghost>Cancel</Button>
          <Button>Next</Button>
        </div>
      </div>
    </section>
  );
};

export default SelectTicket;
