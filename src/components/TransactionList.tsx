import React from "react";
import TransactionPreview from "./TransactionPreview";

interface PaymentDetail {
  title: string;
  price: number;
  total: number;
  date: Date;
  time: string;
  tickets: number[];
}

interface TransactionListProps {
  paymentlist: PaymentDetail[];
}

const TransactionList = ({ paymentlist }: TransactionListProps) => {
  return (
    <div className="flex flex-col w-full border-2 border-secondaryBg rounded-xl overflow-hidden">
      {paymentlist.map((payment) => (
        <TransactionPreview {...payment} />
      ))}
    </div>
  );
};

export default TransactionList;
