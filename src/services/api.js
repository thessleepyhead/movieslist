const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchMovies = async (path, params = {}) => {
    if (!API_KEY) {
        throw new Error("Missing VITE_TMDB_API_KEY environment variable");
    }

    const query = new URLSearchParams({ api_key: API_KEY, ...params });
    const response = await fetch(`${BASE_URL}${path}?${query}`);
    if (!response.ok) {
        throw new Error(`Movie request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data.results)) {
        throw new Error("Movie request returned an invalid response");
    }

    return data.results;
};

export const getPopularMovies = () => fetchMovies("/movie/popular");

export const searchMovies = (query) => {
    return fetchMovies("/search/movie", { query });
};