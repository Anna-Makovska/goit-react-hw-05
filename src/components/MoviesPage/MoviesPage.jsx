import s from "./MoviesPage.module.css";
import { useState, useEffect } from "react";
import { FetchSearchMovie } from "../../services/userService";
import MovieList from "../MovieList/MovieList";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryUrl = searchParams.get("query");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery === "") {
      toast.warn("Please enter a search query!"); 
      return;
    }
    navigate(`?query=${trimmedQuery}`);
    setSearchQuery("");
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (!queryUrl) {
        setMovies([]);
        return;
      }
      setLoading(true);
      try {
        const data = await FetchSearchMovie(queryUrl);
        if (data.length === 0) {
          toast.info("No movies found for your query!");
        }
        setMovies(data);
      } catch  {
        toast.error("Failed to fetch movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [queryUrl]);

  return (
    <div className={s.container}>
      <form className={s.form} type="submit" onSubmit={handleSubmit}>
        <input
          className={s.input}
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Find your perfect movie"
          value={searchQuery}
          onChange={handleChange}
        />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
      {loading ? (
        <div className={s.loaderContainer}>
          <BeatLoader color="#e67e22" loading={loading} size={20} />
        </div>
      ) : (
        movies.length > 0 && (
          <MovieList
            movies={movies}
            from={location.pathname + location.search}
          />
        )
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default MoviesPage;
