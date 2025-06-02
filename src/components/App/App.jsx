import s from "./App.module.css"
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const Navigation = lazy(() => import("../Navigation/Navigation"));
const HomePage = lazy(() => import("../HomePage/HomePage"));
const MoviesPage = lazy(() => import("../MoviesPage/MoviesPage"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieList = lazy(() => import("../MovieList/MovieList"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const MovieDetailsPage = lazy(() =>
  import("../MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() => import("../NotFoundPage/NotFoundPage"));

function App() {


  return (
    <div className={s.container}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast /> } />
          <Route path="reviews" element={<MovieReviews />}  />
        </Route>
        <Route path="*" element={<NotFoundPage/>} />
    </Routes>
    </div>
  )
}

export default App
