import s from "./MovieReviews.module.css";
import { FetchMovieReviews } from "../../services/userService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      try {
        const data = await FetchMovieReviews(movieId);
        setReviews(data);
      } catch {
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [movieId]);

  if (loading) {
    return (
      <div className={s.loaderContainer}>
        <BeatLoader color="#3498db" loading={loading} size={15} />
        <p className={s.loadingText}>Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return <p className={s.error}>{error}</p>;
  }

  return (
    <div className={s.container}>
      {reviews.length === 0 ? (
        <p className={s.noReviews}>We don't have any reviews for this movie.</p>
      ) : (
        <ul className={s.list}>
          {reviews.map((review) => (
            <li className={s.item} key={review.id}>
              <h3 className={s.subtitleAuthor}>Author: {review.author}</h3>
              <p className={s.subtitleContent}>{review.content}</p>
              <p className={s.subtitleDate}>
                {new Date(review.updated_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
