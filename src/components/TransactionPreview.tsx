"use client";

import React, { useState } from "react";
import { BsCalendar4Week, BsClock } from "react-icons/bs";
import { MdChair, MdOutlinePriceChange } from "react-icons/md";

interface PaymentDetail {
  id: string;
  title: string;
  price: number;
  total: number;
  date: Date;
  time: string;
  tickets: number[];
  onRefundClick: (id: string) => void;
}

const TransactionPreview = ({
  id,
  title,
  price,
  total,
  date,
  time,
  tickets,
  onRefundClick,
}: PaymentDetail) => {
  // CONST
  const [isDelete, setIsDelete] = useState(false);

  // Check if ticket is refundable
  const dateMovie = new Date(date.toLocaleDateString());
  const todayDate = new Date(new Date().toLocaleDateString());
  const nonRefundable = todayDate.getTime() >= dateMovie.getTime();

  // FUNCTION
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center px-5 py-5 lg:px-8 border-b-2 border-secondaryBg hover:bg-secondaryBg transition-all">
      {/* TICKET INFO */}
      <div className="flex flex-col justify-center items-start bg-primaryBg rounded-xl border-2 border-secondaryBg w-full max-w-[240px]">
        <div className="w-full border-b-2 border-secondaryBg text-center py-2 px-6 text-[18px] truncate">
          {title}
        </div>
        <div className="py-4 px-6">
          <div className="flex flex-row items-center justify-start gap-2">
            <BsCalendar4Week /> {date.toLocaleDateString()}
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <BsClock /> {time}
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <MdOutlinePriceChange /> {formatter.format(price)}
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <MdChair /> {tickets.join(", ")}
          </div>
        </div>
        <div className="w-full border-t-2 border-secondaryBg text-center py-2 px-6 text-[18px] truncate">
          {formatter.format(total)}
        </div>
      </div>

      {/* REFUND OPTION */}

      <div className="flex flex-col justify-center items-center gap-2 text-medium pt-6">
        {isDelete ? (
          <>
            <div>Are you sure?</div>
            <div className="flex flex-row gap-2">
              <button
                className="py-1 px-6 w-[80px] border-[1px] rounded-lg border-secondaryBg hover:border-white bg-red-400 md:bg-primaryBg hover:bg-red-400 hover:scale-105 active:scale-95 transition-all"
                onClick={() => setIsDelete(!isDelete)}
              >
                No
              </button>
              <button
                className="py-1 px-6 w-[80px] border-[1px] rounded-lg border-secondaryBg hover:border-white bg-green-400 md:bg-primaryBg hover:bg-green-400 hover:scale-105 active:scale-95 transition-all"
                onClick={() => onRefundClick(id)}
              >
                Yes
              </button>
            </div>
          </>
        ) : (
          <button
            disabled={nonRefundable}
            className="py-2 px-6 border-[2px] rounded-lg border-white hover:border-white bg-secondaryBg hover:bg-primaryYellow hover:scale-105 active:scale-95 transition-all disabled:cursor-not-allowed disabled:border-secondaryBg disabled:bg-primaryBg"
            onClick={() => setIsDelete(!isDelete)}
          >
            Refund
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionPreview;
