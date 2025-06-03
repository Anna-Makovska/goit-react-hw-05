import s from "./MovieCast.module.css";
import { FetchMovieCast } from "../../services/userService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    setLoading(true);
    FetchMovieCast(movieId)
      .then((data) => setCast(data))
      .catch(() => toast.error("Failed to load cast"))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <>
      {loading ? (
        <div className={s.loaderWrapper}>
          <MoonLoader color="#f5c518" size={50} />
        </div>
      ) : (
        <ul className={s.castList}>
          {cast.map((actor) => (
            <li key={actor.id} className={s.castItem}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
