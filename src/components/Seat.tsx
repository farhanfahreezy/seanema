"use client";

import React, { useState } from "react";

interface SeatProps {
  id: number;
  isBooked: boolean;
}

const Seat = ({ id, isBooked }: SeatProps) => {
  const [selected, setSelected] = useState(false);
  return (
    <div className="relative lg:w-[50px] w-[30px] aspect-square">
      <button
        disabled={isBooked}
        className={`${
          selected ? "bg-secondaryYellow" : "bg-primaryYellow"
        } disabled:bg-secondaryGray disabled:cursor-not-allowed w-full h-full rounded-md peer transition-all select-none font-medium text-[16px] lg:text-[24px] text-white hover:text-opacity-80 text-opacity-0 text-center`}
        onClick={() => {
          setSelected(!selected);
        }}
      >
        {id}
      </button>
    </div>
  );
};

export default Seat;
