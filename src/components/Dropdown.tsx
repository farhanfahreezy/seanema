import React, { useState } from "react";
import { BiTimeFive } from "react-icons/bi";

interface DropdownProps {
  value: string;
  options: string[];
  handleClick: (value: string) => void;
}

const Dropdown = ({ value, options, handleClick }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative w-full">
      <button
        className="w-full flex flex-row items-center justify-between rounded-md text-black border-2 border-primaryYellow shadow-inner bg-white py-2 px-3"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div>{value}</div>
        <BiTimeFive size={18} />
      </button>
      <div
        className={`absolute ${
          open ? "top-[50px] opacity-100" : "top-[100px] opacity-0 hidden"
        } right-0 w-fit grid grid-cols-2 gap-0 bg-white border-2 border-primaryYellow rounded-md text-black transition-all`}
        onClick={() => setOpen(!open)}
      >
        {options.map((option) => (
          <button
            className="w-full py-2 px-4 bg-slate-100 hover:bg-white border-2 border-white transition-all"
            key={option}
            onClick={() => {
              handleClick(option);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
