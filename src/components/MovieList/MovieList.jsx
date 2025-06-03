
import s from "./MovieList.module.css";
import { Link} from "react-router-dom";

const MovieList = ({ movies, from }) => {

  return (
    <ul className={s.list}>
      {movies.map((movie, index) => (
        <li
          key={movie.id}
          className={s.link}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <Link to={`/movies/${movie.id}`} state={{ from: from }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;

