import Image from "next/image";
import React from "react";
import { Button } from "antd";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-2 px-2 border border-[#197686] rounded-2xl mb-10">
      <div>
        <Link href="/">
          <Image src={"/logo.png"} alt="Logo" width={95} height={95} />
        </Link>
      </div>
      <nav className="hidden md:block">
        <ul className="flex justify-between items-center space-x-4 ">
          <li>Events</li>
          <li>My Tickets</li>
          <li>About Project</li>
        </ul>
      </nav>
      <div>
        <Button>MY TICKETS</Button>
      </div>
    </header>
  );
}
