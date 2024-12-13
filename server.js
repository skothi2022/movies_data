const express = require('express');
const axios = require('axios');
require('dotenv').config(); 

const app = express();
const PORT = 3000;

const DISCOVER_MOVIE_API = 'https://api.themoviedb.org/3/discover/movie';
const MOVIE_CREDITS_API = 'https://api.themoviedb.org/3/movie';

app.use(express.json());

app.get('/movies', async (req, res) => {
    const { year, page = 2 } = req.query;

    if (!year || isNaN(year)) {
        return res.status(400).json({ error: 'Year is required and must be a valid number.' });
    }

    try {
        const moviesResponse = await axios.get(DISCOVER_MOVIE_API, {
            headers: { Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}` },
            params: {
                language: 'en-US',
                page,
                primary_release_year: year,
                sort_by: 'popularity.desc',
            },
        });

        const movies = await Promise.all(
            moviesResponse.data.results.map(async (movie) => {
                let editors = [];
                try {
                    const creditsResponse = await axios.get(`${MOVIE_CREDITS_API}/${movie.id}/credits`, {
                        headers: { Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}` },
                    });

                    editors = creditsResponse.data.crew
                        .filter((crewMember) => crewMember.known_for_department === 'Editing')
                        .map((editor) => editor.name);
                } catch (error) {
                    console.error(`Failed to fetch credits for movie ID ${movie.id}:`, error.message);
                }

                return {
                    title: movie.title,
                    release_date: movie.release_date,
                    vote_average: movie.vote_average,
                    editors,
                };
            })
        );

        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ error: 'Failed to fetch movies. Please try again later.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});