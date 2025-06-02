import s from "./MovieList.module.css";
import { Link } from "react-router-dom";
const MovieList = ({ movies }) => {
  return (
    <ul className={s.list}>

          {movies.map((movie) => (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: location.pathname + location.search }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        
    </ul>
  );
};
export default MovieList;