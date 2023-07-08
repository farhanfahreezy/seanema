"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface pageProps {
  params: { title: string; detail: string };
}

interface PaymentDetail {
  title: string;
  price: number;
  total: number;
  date: Date;
  time: string;
  tickets: number[];
}

interface MovieDetail {
  id: number;
  title: string;
  description: string;
  release_date: string;
  poster_url: string;
  age_rating: number;
  ticket_price: number;
}

interface UserDetail {
  name: string;
  username: string;
  balance: number;
  birthday: Date;
}

const Page: FC<pageProps> = ({ params }) => {
  // CONST
  const [paymentDetail, setPaymentDetail] = useState<PaymentDetail | null>(
    null
  );
  const [movie, setMovie] = useState<MovieDetail | null | 0>(0);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const router = useRouter();
  const session = useSession();
  const userSession = session.data?.user as UserDetail;

  // HOOKS
  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/login");
    }
  }, [session?.status, router]);

  // FUNCTION
  const getMovieByTitle = async (
    title: string
  ): Promise<MovieDetail | null> => {
    // Karna id dari API comfest itu banyak yang duplikat, nyari movienya pake title
    try {
      const response = await axios.get(
        "https://seleksi-sea-2023.vercel.app/api/movies"
      );
      const movies: MovieDetail[] = response.data;
      const movie = movies.find((movie) => movie.title === title);
      return movie || null;
    } catch (error) {
      console.error("Error fetching movie data:", error);
      return null;
    }
  };

  function parseDateString(dateString: string) {
    const datePart = dateString.substring(0, 10);
    const dateArray: string[] = [];
    dateArray.push(datePart.substring(3, 5));
    dateArray.push(datePart.substring(0, 2));
    dateArray.push(datePart.substring(6));
    const timePart = dateString.substring(10, 15);
    const integerPart = dateString.substring(15);

    const dateObject = new Date(dateArray.join("/"));
    const integerArray = integerPart.split(",").map(Number);

    return {
      date: dateObject,
      time: timePart,
      tickets: integerArray,
    };
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });

  const onPaymentClick = () => {
    const data = { ...paymentDetail, username: userDetail?.username };
    axios
      .post("/api/payment/", data)
      .then((res) => {
        router.push("/transaction/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const title = decodeURIComponent(params.title);
    let price;
    getMovieByTitle(title).then((movie) => {
      setMovie(movie);
      price = movie?.ticket_price;
      const { date, time, tickets } = parseDateString(
        decodeURIComponent(params.detail)
      );
      tickets.sort();
      const total = price! * tickets.length;
      setPaymentDetail({ title, price: price!, total, date, time, tickets });
    });
    axios
      .get("/api/getUser/", { params: { username: userSession?.username } })
      .then((res) => {
        const newUserDetail = {
          ...res.data,
          birthday: new Date(res.data.birthday),
        };
        setUserDetail(newUserDetail);
      })
      .catch((err) => console.log(err));
  }, [params.title, params.detail, userSession?.username]);

  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen overflow-x-hidden py-[150px]">
      <Navbar />
      {movie === 0 ? (
        <div>Loading...</div>
      ) : movie && paymentDetail ? (
        <>
          {/* PAGE CONTENT */}
          <div className="flex flex-col lg:flex-row justify-start items-center w-full h-full px-10 gap-8">
            {/* TICKET */}
            <div className="flex flex-col w-full lg:w-[60%] xl:w-[55%] items-center justify-center">
              <div className="relative">
                <Image
                  src="/ticket.svg"
                  alt="ticket"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-[400px] lg:w-[600px] h-auto"
                />
                <div className="absolute top-0 h-full w-full pr-9 lg:pr-14 py-7 lg:py-10 pl-24 lg:pl-36">
                  <div className="h-full w-full md:p-2">
                    <div className="text-[20px] lg:text-[36px] font-bold text-primaryBg truncate underline lg:pb-2">
                      {paymentDetail.title}
                    </div>
                    <div className="flex flex-row w-full text-primaryBg font-bold text-[8px] sm:text-[12px] lg:text-[16px]">
                      <div className="flex flex-col w-[60%]">
                        <div className="text-[12px] sm:text-[14px] lg:text-[20px] font-bold py-1 px-3 bg-primaryBg text-primaryYellow rounded-md w-fit">
                          Seat
                        </div>
                        <div className="lg:pb-2 pl-1">
                          {paymentDetail.tickets?.join(", ")}
                        </div>
                        <div className="text-[12px] sm:text-[14px] lg:text-[20px] font-bold py-1 px-3 bg-primaryBg text-primaryYellow rounded-md w-fit">
                          Price
                        </div>
                        <div className="pl-1">
                          {formatter.format(paymentDetail.price)} x{" "}
                          {paymentDetail.tickets?.length}
                        </div>
                        <div className="pl-1">
                          = {formatter.format(paymentDetail.total)}
                        </div>
                      </div>
                      <div className="flex flex-col w-[40%] bg-primaryBg py-2 pb-3 px-4 rounded-md lg:gap-2 h-fit">
                        <div className="text-[12px] sm:text-[14px] lg:text-[20px] font-bold text-[#C18B36]">
                          Date
                        </div>
                        <div className="bg-[#BC8836] rounded-md text-center">
                          {paymentDetail.date?.toLocaleDateString()}
                        </div>
                        <div className="text-[12px] sm:text-[14px] lg:text-[20px] font-bold  text-[#BC8836] roun">
                          Time
                        </div>
                        <div className="bg-[#BC8836] rounded-md text-center">
                          {paymentDetail.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* CONFIRMATION */}
            <div className="flex flex-col w-full max-w-[560px] lg:w-[40%] xl:w-[45%] items-center justify-center bg-gradient-to-br from-[#FFFFFF] to-[#D3D3D3] text-primaryBg font-bold text-[16px] lg:text-[30px] py-8 px-8 rounded-3xl gap-2">
              <div className="flex flex-row justify-between w-full items-center">
                <div>Total Order</div>
                <div className="bg-secondaryBg py-2 px-4 lg:px-6 rounded-xl text-white text-[12px] lg:text-[24px] w-[280px] text-right">
                  {formatter.format(paymentDetail.total)}
                </div>
              </div>
              <div className="flex flex-row justify-between w-full items-center pb-5">
                <div>Your Balance</div>
                <div className="bg-secondaryBg py-2 px-4 lg:px-6 rounded-xl text-white text-[12px] lg:text-[24px] w-[280px] text-right">
                  {userDetail
                    ? formatter.format(userDetail.balance)
                    : "Loading"}
                </div>
              </div>
              {userDetail?.balance! >= paymentDetail.total ? (
                <button
                  className="bg-white py-3 px-12  w-full rounded-xl hover:scale-[1.01] active:scale-[1] transition-all border-2 lg:border-3 border-primaryYellow"
                  onClick={onPaymentClick}
                >
                  Confirm Payment
                </button>
              ) : (
                <Link href={"/topup"} className="w-full">
                  <button className="bg-white py-3 px-12  w-full rounded-xl border-2 lg:border-3 border-red-400 text-red-400">
                    Insufficient Balance
                  </button>
                </Link>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="absolute top-50 border-2 border-primaryYellow py-2 px-6 text-[48px] font-medium rounded-xl">
          Movie Not Found
        </div>
      )}
    </div>
  );
};

export default Page;
