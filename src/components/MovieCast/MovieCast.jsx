import s from "./MovieCast.module.css"
import { FetchMovieCast } from "../../services/userService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieCast = () => {
    const [cast, setCast] = useState([]);
    const { movieId } = useParams();


    useEffect(() => {
        FetchMovieCast(movieId)
            .then((data) => setCast(data))
            .catch((error) => console.log(error))
    }, [movieId]);

    return (
      <>
        <ul className={s.castList}>
          {cast.map((actor) => (
            <li key={actor.id} className={s.castItem}>
              <img
                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                alt={actor.name}
              ></img>
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </li>
          ))}
        </ul>
      </>
    );
}
export default MovieCast;