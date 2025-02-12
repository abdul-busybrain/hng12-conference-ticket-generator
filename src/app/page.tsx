"use client";

import React from "react";
import Header from "./components/Header";
import SelectTicket from "./pages/SelectTicket";

interface HomeProps {
  onSelect: (type: string, quantity: number) => void;
}

const Home: React.FC<HomeProps> = () => {
  const handleSelect = (type: string, quantity: number) => {
    console.log(type, quantity);
  };

  return (
    <>
      <Header />
      <SelectTicket onSelect={handleSelect} />
    </>
  );
};

export default Home;
