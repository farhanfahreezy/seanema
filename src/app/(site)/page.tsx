"use client";

import axios from "axios";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import Youtube, { YouTubeProps } from "react-youtube";

interface MovieCardProps {
  title: string;
  poster_url: string;
  age_rating: number;
}

export default function Home() {
  // CONST
  const [movieList, setMovieList] = useState<MovieCardProps[]>();
  const [screenWidth, setScreenWidth] = useState(0);

  const opts: YouTubeProps["opts"] = {
    height:
      screenWidth > 1200 ? "800px" : screenWidth > 600 ? "400px" : "200px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  // FUNCTION
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://seleksi-sea-2023.vercel.app/api/movies"
        );
        const movies: MovieCardProps[] = Object.values(response.data).map(
          (movie: any) => ({
            title: movie.title,
            poster_url: movie.poster_url,
            age_rating: movie.age_rating,
          })
        );
        setMovieList(movies);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Set initial screen width
    setScreenWidth(window.innerWidth);

    // Add event listener to update screen width on resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative flex flex-col justify-start items-start w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="flex flex-col pt-[120px] sm:pt-[150px] w-full px-2 lg:px-10 py-10 gap-10">
        <div>
          <div className="text-[24px] lg:text-[30px] font-semibold">
            Now Showing on Seanema
          </div>
          {movieList ? (
            <MovieList movieCards={movieList} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div>
          <div className="text-[30px] font-bold">Featured</div>
        </div>
        <div className="w-full h-fit rounded-xl overflow-hidden">
          <Youtube videoId="uYPbbksJxIg" opts={opts} />
        </div>
      </div>
    </div>
  );
}
