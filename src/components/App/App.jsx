import s from "./App.module.css"
import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import HomePage from "../HomePage/HomePage";
import MoviesPage from "../MoviesPage/MoviesPage";
import MovieCast from "../MovieCast/MovieCast";
import MovieList from "../MovieList/MovieList";
import MovieReviews from "../MovieReviews/MovieReviews";
import MovieDetailsPage from "../MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function App() {

  return (
    <div className={s.container}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieInfo" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />}  />
        </Route>
        <Route path="*" element={<NotFoundPage/>} />
    </Routes>
    </div>
  )
}

export default App
