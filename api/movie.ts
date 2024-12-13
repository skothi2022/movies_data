import axios from 'axios';
import {TMDB_DISCOVER_API, TMDB_CREDITS_API } from '../constants/api'
// Import dotenv to load environment variables
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();
const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

// Accepting the Bearer token.
const headers = {
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
};

// API to fetch the movies response
export const fetchMovies = async (params: object) => {
    return axios.get(TMDB_DISCOVER_API as string, { headers, params });
};

// API to fetch movie credits based on particular movie.
export const fetchMovieCredits = async (movieId: string) => {
    return axios.get(`${TMDB_CREDITS_API}/${movieId}/credits`, { headers });
};
