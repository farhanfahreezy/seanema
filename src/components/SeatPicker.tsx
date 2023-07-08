import React from "react";
import Seat from "./Seat";

interface SeatProps {
  id: number;
  isBooked: boolean;
}

interface SeatPickerProps {
  seats: SeatProps[];
  handleClick: (id: number) => void;
}

const SeatPicker = ({ seats, handleClick }: SeatPickerProps) => {
  return (
    <div className="w-fit flex flex-col justify-center items-center bg-primaryBg rounded-xl px-[30px] lg:px-[40px] py-[20px] shadow-2xl">
      {seats ? (
        <>
          {/* SCREEN */}
          <div className="w-full h-[8px] bg-primaryYellow rounded-md"></div>
          <div className="font-medium pb-4 pt-2">Screen</div>

          {/* SEATS */}
          <div className="grid grid-cols-8 gap-1 lg:gap-3">
            {seats.map((seat) => (
              <button
                onClick={() => {
                  handleClick(seat.id);
                }}
                key={seat.id}
              >
                <Seat {...seat} />
              </button>
            ))}
          </div>

          {/* KETERANGAN */}
          <div className="flex flex-row items-center justify-around w-full pt-4">
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="bg-secondaryGray w-[14px] aspect-square rounded-full"></div>
              <div>Booked</div>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="bg-primaryYellow w-[14px] aspect-square rounded-full"></div>
              <div>Available</div>
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="bg-secondaryYellow w-[14px] aspect-square rounded-full"></div>
              <div>Selected</div>
            </div>
          </div>
        </>
      ) : (
        <div className="font-medium text-[24px]">Nothing to show</div>
      )}
    </div>
  );
};

export default SeatPicker;
