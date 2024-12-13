import axios from 'axios';

const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

const headers = {
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
};

export const fetchMovies = async (params: object) => {
    return axios.get(process.env.TMDB_DISCOVER_API as string, { headers, params });
};

export const fetchMovieCredits = async (movieId: string) => {
    return axios.get(`${process.env.TMDB_CREDITS_API}/${movieId}/credits`, { headers });
};
