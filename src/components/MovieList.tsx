import MovieCard from "./MovieCard";

interface MovieCardProps {
  title: string;
  poster_url: string;
  age_rating: number;
}

interface MovieListProps {
  movieCards: MovieCardProps[];
}

const MovieList = ({ movieCards }: MovieListProps) => {
  return (
    <div className="flex flex-row w-full py-10 overflow-x-auto justify-start gap-5">
      {movieCards.map((card, index) => (
        <MovieCard key={index} {...card} />
      ))}
    </div>
  );
};

export default MovieList;
