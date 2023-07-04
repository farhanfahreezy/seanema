import Link from "next/link";
import React from "react";

interface MovieCardProps {
  title: string;
  poster_url: string;
  age_rating: number;
}

const MovieCard = ({ title, poster_url, age_rating }: MovieCardProps) => {
  return (
    <div className="flex flex-col justify-start items-center w-fit">
      <Link href={"/movie/" + title} className="w-[50vw] max-w-[300px]">
        <img
          src={poster_url}
          alt={title}
          className="w-full rounded-2xl shadow-xl hover:scale-[1.05] transition-all"
        />
      </Link>

      <div className="text-[16px] lg:text-[24px] font-medium pt-5 text-center w-full">
        {title}
      </div>
    </div>
  );
};

export default MovieCard;
