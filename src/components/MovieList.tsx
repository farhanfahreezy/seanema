import MovieCard from "./MovieCard";
import style from "./MovieList.module.css";

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
    <div className={style.custom}>
      {movieCards.map((card, index) => (
        <MovieCard key={index} {...card} />
      ))}
    </div>
  );
};

export default MovieList;
