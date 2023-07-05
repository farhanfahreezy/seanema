import Navbar from "@/components/Navbar";
import TransactionList from "@/components/TransactionList";

interface PaymentDetail {
  title: string;
  price: number;
  total: number;
  date: Date;
  time: string;
  tickets: number[];
}

// DUMMY DATA
const dates = new Date();
const future = new Date(dates);
const past = new Date(dates);
future.setDate(dates.getDate() + 1);
past.setDate(dates.getDate() - 1);
const dummyPayment: PaymentDetail = {
  title: "Fast X Fast X Fast X Fast X",
  price: 53000,
  total: 265000,
  date: future,
  time: "11:00",
  tickets: [10, 20, 30, 40, 50, 60],
};

const dummyPayment2: PaymentDetail = {
  ...dummyPayment,
  date: past,
};

const dummyArr = [
  dummyPayment,
  dummyPayment2,
  dummyPayment,
  dummyPayment2,
  dummyPayment,
  dummyPayment,
];
const name = "Miles Morales";

// END OF DUMMY DATA
export default function Home() {
  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="flex flex-col pt-[150px] w-full max-w-[1000px] px-8 lg:px-10 py-10 gap-5 text-medium">
        <TransactionList paymentlist={dummyArr} />
      </div>
    </div>
  );
}
