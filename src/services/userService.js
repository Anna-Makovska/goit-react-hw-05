import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_KEY = "a28b5f4c8cb5377caf2afb54eba5f885";

export const fetchTrendingMovies = async () => {
    const res = await axios.get("/trending/movie/day", {
      params: {
        api_key: API_KEY,
      },
    });
    return res.data.results;
    
}

export const fetchMovieInfo = async (movieId) => {
    const res = await axios.get(`/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
      },
    });
    console.log(res.data)
    return res.data;
}


export const FetchMovieCast = async (movieId) => {
    const res = await axios.get(
      `movie/${movieId}/credits?language=en-US`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    return res.data.cast;
        
    
}


export const FetchMovieReviews = async (movieId) => {
    const res = await axios.get(
      `/movie/${movieId}/reviews?language=en-US&page=1`,
      {
        params: {
          api_key: API_KEY,
        },
      }
    );
    return res.data.results;
}


export const FetchSearchMovie = async (searchQuery) => {
  const res = await axios.get(
    `/search/movie`,
    {
      params: {
        api_key: API_KEY,
        query: searchQuery,
      },
    }
  );
  return res.data.results;
}