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
          <p>We don't have any reviews for this movie.</p>
        )}
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.author}</p>
              <p>{review.content}</p>
                  <p>{new Date(review.updated_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </>
    );
}
export default MovieReviews;