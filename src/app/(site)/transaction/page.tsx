"use client";

import Navbar from "@/components/Navbar";
import TransactionList from "@/components/TransactionList";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PaymentDetail {
  id: string;
  title: string;
  price: number;
  total: number;
  date: Date;
  time: string;
  tickets: number[];
}

interface UserSession {
  name: string;
  username: string;
}

export default function Home() {
  // CONST
  const [transactionList, setTransactionList] = useState<
    PaymentDetail[] | null
  >(null);
  const router = useRouter();
  const session = useSession();
  const userSession = session.data?.user as UserSession;

  // HOOKS
  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/login");
    } else {
      axios
        .get("/api/getUserTransaction/", {
          params: { username: userSession?.username },
        })
        .then((res) => {
          const newTransactionList = res.data.map((item: PaymentDetail) => ({
            ...item,
            date: new Date(item.date),
          }));
          setTransactionList(newTransactionList);
        })
        .catch((err) => console.log(err));
    }
  }, [router, session?.status, userSession?.username]);

  // FUNCTION
  const onRefundClick = (id: string) => {
    const data = { id, username: userSession?.username };
    axios
      .post("/api/refund/", data)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen overflow-x-hidden">
      <Navbar />
      {transactionList ? (
        transactionList.length ? (
          <div className="flex flex-col pt-[150px] w-full max-w-[1000px] px-8 lg:px-10 py-10 gap-5 text-medium items-center justify-center">
            <TransactionList
              paymentlist={transactionList}
              onRefundClick={onRefundClick}
            />
          </div>
        ) : (
          <div>No transaction history found</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
