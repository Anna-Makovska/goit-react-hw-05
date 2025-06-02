import s from "./MovieReviews.module.css"
import { FetchMovieReviews } from "../../services/userService";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

const MovieReviews = () => {

    const [reviews, setReviews] = useState([]);
    const { movieId } = useParams();


    useEffect(() => {
        FetchMovieReviews(movieId)
            .then((data) => setReviews(data))
            .catch("error");
    })

    return (
      <>
        {reviews.length === 0 && (
          <p className={s.subtitle}>We don't have any reviews for this movie.</p>
        )}
        <ul className={s.list}>
          {reviews.map((review) => (
            <li className={s.item} key={review.id}>
              <p className={s.subtitleAuthor}>{review.author}</p>
              <p className={s.subtitleContent}>{review.content}</p>
                  <p className={s.subtitleDate}>{new Date(review.updated_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </>
    );
}
export default MovieReviews;