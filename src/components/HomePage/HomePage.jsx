import { useEffect, useState } from "react";
import s from "./HomePage.module.css";
import { fetchTrendingMovies } from "../../services/userService";
import MovieList from "../MovieList/MovieList";
import { MoonLoader } from "react-spinners";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTrendingMovies()
      .then((data) => setMovies(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className={s.title}>Trending Movies</h1>
      {loading ? (
        <div className={s.loaderWrapper}>
          <MoonLoader color="#f5c518" size={60} />
        </div>
      ) : (
        <MovieList movies={movies} />
      )}
    </>
  );
};

export default HomePage;
