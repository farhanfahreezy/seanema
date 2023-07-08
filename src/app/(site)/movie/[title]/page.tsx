"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
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

const Page: FC<pageProps> = ({ params }) => {
  const [movie, setMovie] = useState<MovieDetail | null | 0>(0);
  const session = useSession();

  useEffect(() => {
    // Decode string uri-nya
    const newTitle = decodeURIComponent(params.title);
    getMovieByTitle(newTitle).then((movie) => {
      setMovie(movie);
    });
  }, [params.title]);

  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen overflow-x-hidden py-[150px]">
      <Navbar />
      {movie === 0 ? (
        <div>Loading...</div>
      ) : movie ? (
        <>
          {/* BACKGROUND SECTION */}
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
          <div className="flex flex-col md:flex-row justify-start items-center w-full h-full px-10 gap-8">
            {/* POSTER */}
            <Image
              src={movie?.poster_url}
              alt={movie.title}
              width={0}
              height={0}
              sizes="100vw"
              className="lg:w-auto w-full h-auto lg:h-[600px] rounded-xl shadow-2xl"
            />

            {/* DESKRIPSi */}
            <div className="flex flex-col justify-center items-start w-auto">
              <div className="text-[48px] font-medium">{movie.title}</div>
              <div className="text-[24px] font-light">{movie.description}</div>
              <div className="flex flex-col xl:flex-row pb-10 xl:pb-5 items-center xl:gap-5">
                <div className="flex flex-row items-center gap-5 py-5 xl:py-10">
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
                  href={
                    "https://www.youtube.com/results?search_query=" +
                    movie.title.replace(" ", "+")
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col hover:text-white hover:bg-gradient-to-br from-primaryYellow to-secondaryYellow h-[80px] border-2  items-center justify-center py-2 px-6 rounded-xl gap-2 font-bold text-[32px] hover:scale-105 active:scale-[0.98] transition-all"
                >
                  Watch Trailer
                </Link>
              </div>
              <Link
                href={
                  session.status === "authenticated"
                    ? "/book/" + movie.title
                    : "/login"
                }
                className="text-[36px] py-2 px-6 w-full text-center sm:w-fit font-medium rounded-xl bg-transparent hover:bg-gradient-to-br from-primaryYellow to-secondaryYellow transition-all border-2 border-primaryYellow hover:border-white hover:scale-105 active:scale-95"
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

export default Page;
