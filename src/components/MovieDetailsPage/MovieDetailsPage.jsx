import s from "./MoviesDetailsPage.module.css";
import { MdArrowBack } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { fetchMovieInfo } from "../../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MoonLoader } from "react-spinners";
import { FetchMovieVideo } from "../../services/userService";


const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [video, setVideo] = useState([]);


  useEffect(() => {
    const loadMovieDetails = async () => {
      setLoading(true);
      try {
        if (!movieId) {
          toast.error("Movie ID is required.");
          return;
        }
        const data = await fetchMovieInfo(movieId);
        setMovie(data);
      } catch {
        toast.error("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId]);


  useEffect(() => {
    FetchMovieVideo(movieId)
    .then((data) => setVideo(data))
  }, [movieId, setVideo])

  const location = useLocation();
  

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate("/");
    }
  };

 

  if (loading) {
    return (
      <div className={s.loaderContainer}>
        <MoonLoader color="#ffffff" height={80} width={80} />
      </div>
    );
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div className={s.container}>
      <button className={s.button} onClick={handleGoBack}>
        <MdArrowBack />
        Go back
      </button>
      <div className={s.wrapper}>
        <div className={s.imgWrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className={s.contentWrapper}>
          <h2 className={s.mainTitle}>{movie.title}</h2>
          <p className={s.subtitle}>
            User Score:{" "}
            {Math.round(
              Math.max(0, Math.min(100, (movie.popularity / 1000) * 1000))
            )}
            %
          </p>
          <h3 className={s.title}>Overview</h3>
          <p className={s.subtitle}>{movie.overview}</p>
          <h3 className={s.title}>Genres</h3>
          <ul className={s.list}>
            {movie.genres.map((genre) => (
              <li className={s.item} key={genre.id}>
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {video && <p>{video.iso_639_1}</p>}
      <p className={s.additionalInfo}>Additional information</p>
      <ul className={s.navList}>
        <li className={s.navLink}>
          <NavLink to="cast" state={{ from: location.state?.from }}>
            Cast
          </NavLink>
        </li>
        <li className={s.navLink}>
          <NavLink to="reviews" state={{ from: location.state?.from }}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
