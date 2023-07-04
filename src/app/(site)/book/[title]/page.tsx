"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

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

// Karna id dari API comfest itu banyak yang duplikat, nyari movienya pake title
const getMovieByTitle = async (title: string): Promise<MovieDetail | null> => {
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

const page: FC<pageProps> = ({ params }) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState("");

  useEffect(() => {
    // Decode string uri-nya
    const newTitle = decodeURIComponent(params.title);
    getMovieByTitle(newTitle).then((movie) => {
      setMovie(movie);
    });
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen overflow-x-hidden py-[150px]">
      <Navbar />
      {movie ? (
        <>
          <div className="z-[-100]">
            <div className="absolute top-0 left-0 h-[90vh] w-full overflow-hidden z-[11] bg-gradient-to-t from-primaryBg to-transparent" />
            <div className="absolute top-0 left-0 h-[90vh] w-full overflow-hidden z-[10]">
              <img
                src={movie?.poster_url}
                alt={movie.title}
                className="w-full h-auto blur-sm opacity-50"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-start items-center w-full h-full px-10 gap-8">
            <div className="flex flex-col w-full lg:w-[40%] items-center justify-center">
              <div className="flex flex-row gap-5">
                <img
                  src={movie?.poster_url}
                  alt={movie.title}
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
              <div className="flex flex-col py-10 items-center justify-center">
                <div className="text-[24px] font-medium px-6 py-2 border-2 rounded-2xl border-primaryYellow">
                  Please Select Date and Time
                </div>
                <div className="flex flex-col w-full px-1">
                  <form className="flex flex-row w-full py-4 gap-2">
                    <input
                      type="date"
                      value={date.toISOString().split("T")[0]}
                      className="rounded-md text-black border-2 border-primaryYellow shadow-inner w-full"
                    />
                    <input
                      type="time"
                      // value={date.toISOString().split("T")[0]}
                      className="rounded-md text-black border-2 border-primaryYellow shadow-inner w-full"
                    />
                  </form>
                  <button className="w-full py-2 bg-gradient-to-br from-primaryYellow to-secondaryYellow rounded-lg">
                    Search Ticket
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-[60%] items-center justify-center bg-red-400"></div>
          </div>
        </>
      ) : (
        <div className="absolute top-50 bg-gradient-to-br from-primaryYellow to-secondaryYellow py-2 px-6 text-[48px] font-medium rounded-xl">
          Movie Not Found
        </div>
      )}
    </div>
  );
};

export default page;
