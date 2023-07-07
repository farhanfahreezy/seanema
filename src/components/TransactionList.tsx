import React from "react";
import TransactionPreview from "./TransactionPreview";

interface PaymentDetail {
  id: string;
  title: string;
  price: number;
  total: number;
  date: Date;
  time: string;
  tickets: number[];
}

interface TransactionListProps {
  paymentlist: PaymentDetail[];
  onRefundClick: (id: string) => void;
}

const TransactionList = ({
  paymentlist,
  onRefundClick,
}: TransactionListProps) => {
  return (
    <div className="flex flex-col w-full border-2 border-secondaryBg rounded-xl overflow-hidden">
      {paymentlist.map((payment) => (
        <TransactionPreview
          key={payment.id}
          {...payment}
          onRefundClick={onRefundClick}
        />
      ))}
    </div>
  );
};

export default TransactionList;
