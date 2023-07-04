"use client";

import axios from "axios";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

interface MovieCardProps {
  title: string;
  poster_url: string;
  age_rating: number;
}

export default function Home() {
  const [movieList, setMovieList] = useState<MovieCardProps[]>();

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

  return (
    <div className="relative flex flex-col justify-start items-start w-full min-h-screen overflow-x-hidden">
      <Navbar />
      <div className="flex flex-col pt-[150px] w-full px-2 lg:px-10 py-10">
        <div className="text-[36px] font-bold">Now Showing on Cinema</div>
        {movieList ? (
          <MovieList movieCards={movieList} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
