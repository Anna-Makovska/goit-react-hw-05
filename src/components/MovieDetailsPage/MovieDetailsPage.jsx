import s from "./MoviesDetailsPage.module.css"
import { MdArrowBack } from "react-icons/md";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { fetchMovieInfo } from "../../services/userService";

const MovieDetailsPage = () => {
    const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const backlinkHref = location.state?.from ?? "/movies";

  useEffect(() => {
      
    fetchMovieInfo(movieId)
      .then((data) => {
        setMovie(data)
      });
    
  }, [movieId]);
  
  const handleGoBack = () => {
    navigate(backlinkHref);
  };

    if (!movie) return <p>Loading...</p>;
    return (
      <div className={s.container}>
        <button onClick={handleGoBack}>
          <MdArrowBack />
          Go back
        </button>
        <div className={s.wrapper}>
          <div className={s.imgWrapper}>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            ></img>
          </div>
          <div className={s.contentWrapper}>
            <h2>{movie.title}</h2>
            <p>
              User Score:{" "}
              {Math.round(
                Math.max(0, Math.min(100, (movie.popularity / 1000) * 1000))
              )}
              %
            </p>
            <h3>Overview</h3>
            <p> {movie.overview}</p>
            <h3> Genres</h3>
            <ul>
              {" "}
              {movie.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
        <hr style={{ border: "1px solid black", width: "50%" }}></hr>
        <p>Additional information</p>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    );
}

export default MovieDetailsPage;