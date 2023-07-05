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
  const [movie, setMovie] = useState<MovieDetail | null | 0>(0);

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
      {movie === 0 ? (
        <div>Loading...</div>
      ) : movie ? (
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

          <div className="flex flex-col md:flex-row justify-start items-center w-full h-full px-10 gap-8">
            <img
              src={movie?.poster_url}
              alt={movie.title}
              className="w-auto h-[80vh] lg:h-[600px] rounded-xl shadow-2xl"
            />
            <div className="flex flex-col justify-center items-start w-auto h-[0vh] lg:h-[600px]">
              <div className="text-[48px] font-medium">{movie.title}</div>
              <div className="text-[24px] font-light">{movie.description}</div>
              <div className="flex flex-row items-center gap-5 py-10">
                <div className="flex flex-col bg-gradient-to-br from-primaryYellow to-secondaryYellow items-center justify-center py-2 px-4 rounded-xl gap-2">
                  <div className="font-medium text-[16px]">Release Date</div>
                  <div className="bg-secondaryBg px-3 py-1 rounded-md">
                    {movie.release_date}
                  </div>
                </div>
                <div className="flex flex-col bg-gradient-to-br h-[80px] from-primaryYellow to-secondaryYellow items-center justify-center py-2 px-4 rounded-xl gap-2 font-bold text-[32px]">
                  <div>{movie.age_rating}+</div>
                </div>
              </div>
              <Link
                href={"/book/" + movie.title}
                className="text-[36px] py-2 px-6 font-medium rounded-3xl bg-transparent hover:bg-gradient-to-br from-primaryYellow to-secondaryYellow transition-all border-2 border-primaryYellow hover:border-white hover:scale-105 active:scale-95"
              >
                Buy Ticket
              </Link>
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

export default page;
