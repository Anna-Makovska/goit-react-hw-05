import { useEffect, useState} from "react";
import s from "./HomePage.module.css"
import { fetchTrendingMovies } from "../../services/userService";
import MovieList from "../MovieList/MovieList";

const HomePage = () => {
    const [movies, setMovies] = useState([]);


    useEffect(() =>
    {
        fetchTrendingMovies()
            .then((data) => setMovies(data))
    }, []

    )


    return (
        <>
            <h1 className={s.title}>Trending Movies</h1>
            <MovieList movies={movies} />
        </>
     )
}
export default HomePage;