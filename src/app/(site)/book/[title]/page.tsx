"use client";

import Dropdown from "@/components/Dropdown";
import Navbar from "@/components/Navbar";
import SeatPicker from "@/components/SeatPicker";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";

interface pageProps {
  params: { title: string };
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

interface SeatProps {
  id: number;
  isBooked: boolean;
}

interface UserDetail {
  name: string;
  username: string;
  balance: number;
  birthday: Date;
}

export default function Home({ params }: pageProps) {
  // CONST
  const [movie, setMovie] = useState<MovieDetail | null | 0>(0);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [seatArray, setSeatArray] = useState<SeatProps[] | null | 0>(0);

  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState("11:00");
  const [selectedSeat, setSelectedSeat] = useState<number[]>([]);

  const router = useRouter();
  const session = useSession();
  const userSession = session.data?.user as UserDetail;

  // HOOKS
  useEffect(() => {
    if (session?.status !== "authenticated") {
      router.push("/login");
    }
  }, [session?.status, router]);

  useEffect(() => {
    console.log(selectedSeat);
  }, [selectedSeat]);

  useEffect(() => {
    console.log(seatArray);
  }, [seatArray]);

  useEffect(() => {
    // Decode string uri-nya
    const newTitle = decodeURIComponent(params.title);
    getMovieByTitle(newTitle).then((movies) => {
      setMovie(movies);
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
      .catch((err) => console.log("test", err));
  }, [params.title, userSession?.username]);

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
      const movie = movies.find((moviess) => moviess.title === title);
      return movie || null;
    } catch (error) {
      console.error("Error fetching movie data:", error);
      return null;
    }
  };

  const getSeatList = () => {
    setSelectedSeat([]);
    setSeatArray(null);
    if (movie) {
      axios
        .get("/api/getBookedSeat/", {
          params: { title: movie.title, date, time },
        })
        .then((res) => {
          const bookedSeat: number[] = [];
          res.data.map((data: any) =>
            data.tickets.map((num: number) => bookedSeat.push(num))
          );
          const newSeats: SeatProps[] = [];
          for (let i = 1; i <= 64; i++) {
            const seat: SeatProps = {
              id: i,
              isBooked: bookedSeat.includes(i),
            };
            newSeats.push(seat);
          }
          setSeatArray(newSeats);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setSeatArray(0);
        });
    }
  };

  const handleDropdown = (opt: string) => {
    setTime(opt);
  };

  const handleSeatClick = (id: number) => {
    if (selectedSeat.includes(id)) {
      const updatedSelectedSeat = selectedSeat.filter(
        (seatId) => seatId !== id
      );
      setSelectedSeat(updatedSelectedSeat);
    } else {
      setSelectedSeat([...selectedSeat, id]);
    }
    console.log(selectedSeat);
  };

  function formatDate(date: Date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}-${month}-${year}`;
  }

  function isAgeEnough(dateOfBirth: Date, age_rating: number): boolean {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();

    const hasBirthdayOccurred =
      today.getMonth() > dateOfBirth.getMonth() ||
      (today.getMonth() === dateOfBirth.getMonth() &&
        today.getDate() >= dateOfBirth.getDate());

    if (!hasBirthdayOccurred) {
      age--;
    }

    return age >= age_rating;
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen overflow-x-hidden py-[150px]">
      <Navbar />
      {movie === 0 ? (
        <div>Loading...</div>
      ) : movie ? (
        <>
          {/* BACKGROUND */}
          <div className="z-[-100]">
            <div className="absolute top-0 left-0 h-[90vh] w-full overflow-hidden z-[11] bg-gradient-to-t from-primaryBg to-transparent" />
            <div className="absolute top-0 left-0 h-[90vh] w-full overflow-hidden z-[10]">
              <Image
                src={movie?.poster_url}
                alt={movie.title}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto blur-sm opacity-50"
              />
            </div>
          </div>

          {/* PAGE CONTENT */}
          <div className="flex flex-col lg:flex-row justify-start items-center w-full h-full px-3 lg:px-10 gap-8">
            <div className="flex flex-col w-full lg:w-[40%] items-center justify-center">
              {/* MOVIE TICKET */}
              <div className="flex flex-row gap-5">
                <Image
                  src={movie?.poster_url}
                  alt={movie.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-auto h-[200px] rounded-xl shadow-2xl"
                />
                <div className="flex flex-col justify-center items-start text-[24px] font-medium">
                  <div>{movie.title}</div>
                  <div className="border-2 border-primaryYellow px-3 py-1 rounded-md">
                    {movie.age_rating}+
                  </div>
                  <div className="pt-3">
                    Ticket Price : Rp. {movie.ticket_price}
                  </div>
                </div>
              </div>

              {/* TIME PICKER */}
              <div className="flex flex-col py-10 items-center justify-center">
                <div className="text-[24px] font-medium px-6 py-2 border-2 rounded-2xl border-primaryYellow">
                  Please Select Date and Time
                </div>
                <div className="flex flex-col w-full px-1">
                  <div className="flex flex-row w-full py-4 gap-2">
                    <input
                      type="date"
                      value={date.toISOString().split("T")[0]}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setDate(new Date(e.target.value));
                      }}
                      className="rounded-md text-black border-2 border-primaryYellow shadow-inner w-full"
                    />
                    <Dropdown
                      value={time}
                      options={[
                        "11:00",
                        "13:00",
                        "15:00",
                        "17:00",
                        "19:00",
                        "21:00",
                      ]}
                      handleClick={handleDropdown}
                    />
                  </div>
                  <button
                    className="w-full py-2 bg-gradient-to-br from-primaryYellow to-secondaryYellow rounded-lg"
                    onClick={getSeatList}
                  >
                    Search Ticket
                  </button>
                </div>
              </div>
            </div>

            {/* SEAT SELECTION CONTENT */}
            <div className="flex flex-col w-full lg:w-[60%] items-center justify-center gap-5">
              {seatArray === 0 ? (
                <div>Please select time and date</div>
              ) : seatArray ? (
                <SeatPicker seats={seatArray} handleClick={handleSeatClick} />
              ) : (
                <div>Loading...</div>
              )}
              {seatArray !== 0 && seatArray !== null ? (
                !isAgeEnough(userDetail?.birthday!, movie.age_rating) ? (
                  <button className="text-[36px] py-2 px-12 font-medium rounded-xl bg-transparent hover:bg-gradient-to-br from-primaryYellow to-secondaryYellow transition-all border-2 border-primaryYellow hover:border-white hover:scale-105 active:scale-95">
                    Minimum Age of {movie.age_rating}
                  </button>
                ) : selectedSeat.length > 6 || selectedSeat.length < 1 ? (
                  <button className="text-[36px] py-2 px-12 font-medium rounded-xl bg-transparent hover:bg-gradient-to-br from-primaryYellow to-secondaryYellow transition-all border-2 border-primaryYellow hover:border-white hover:scale-105 active:scale-95">
                    Please Select 1-6 Seat
                  </button>
                ) : (
                  <Link
                    href={
                      "/payment/" +
                      movie.title +
                      "/" +
                      formatDate(date) +
                      time +
                      selectedSeat.join(",")
                    }
                  >
                    <button className="text-[36px] py-2 px-12 font-medium rounded-xl bg-transparent hover:bg-gradient-to-br from-primaryYellow to-secondaryYellow transition-all border-2 border-primaryYellow hover:border-white hover:scale-105 active:scale-95">
                      Book Ticket
                    </button>
                  </Link>
                )
              ) : (
                <div></div>
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
}
