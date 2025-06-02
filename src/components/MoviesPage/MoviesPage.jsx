import s from "./MoviesPage.module.css"
import { useState, useEffect } from "react";
import { FetchSearchMovie } from "../../services/userService";
import MovieList from "../MovieList/MovieList";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

const MoviesPage = () => {

    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const queryUrl = searchParams.get("query");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery !== "") {
            navigate(`?query=${trimmedQuery}`);
        } else {
            navigate("?");
        }
    }

    const handleChange = (e) => {
      setSearchQuery(e.target.value);
    };
    
    useEffect(() => {
        if (!queryUrl) {
            return setMovies([]);
        }
        FetchSearchMovie(queryUrl)
            .then((data) => setMovies(data));
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
            onChange={handleChange}
          ></input>
          <button className={s.button} type="submit">Search</button>
        </form>
           {movies.length > 0 && <MovieList movies={movies} />}
      </div>
    );
}

export default MoviesPage;