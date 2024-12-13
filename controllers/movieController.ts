import { Request, Response, NextFunction } from 'express';
import { fetchMovies, fetchMovieCredits } from '../api/movie';
import { release } from 'os';

/**
     * @method getMoviesByPopularity: 
     * @description Getting movie records based on year and popularity
     * @returns Returns movie data after successful validation
     * @param {*} req 
     * @param {*} res
     * @returns 
     */
export const getMoviesByPopularity = async (req: Request, res: Response): Promise<void> => {
    try {
        const { year, page = 1 } = req.query;

        if (!year || isNaN(Number(year))) {
            res.status(400).json({ error: 'Year is required and must be a valid number.' });
            return;
        }
        // Method to fetch movies based on year & language
        const movieResponse = await fetchMovies({
            language: 'en-US',
            sort_by: 'popularity.desc',
            page,
            primary_release_year: year,
        });
        if (movieResponse && movieResponse.data && movieResponse.data.results.length > 0) {
            const movies = await Promise.allSettled(
                movieResponse.data.results.map(async (movie: any) => {
                        let movieData = {
                            title: movie.title,
                            release_date: movie.release_date,
                            vote_average: movie.vote_average,
                            editors: []
                        }
                        // Method to fetch movie credits
                        const creditsResponse = await fetchMovieCredits(movie.id);
                        if (creditsResponse && creditsResponse.data && creditsResponse.data.crew && creditsResponse.data.crew.length > 0) {
                            const editors = creditsResponse.data.crew
                                .filter((crew: any) => crew.known_for_department === 'Editing')
                                .map((editor: any) => editor.name);
                            movieData.editors = editors;
                            return movieData;
                        }
                        else {
                            return movieData
                        }
                })
            );

            if(movies.length > 0){
                const result = movies
                .filter((movie) => movie.status === 'fulfilled')
                .map((movie: any) => movie.value);
                res.json(result);
            }
            else{
                res.status(404).json({ message: 'No movies found in the given year.' });
            }

            
        }
        else {
            res.status(404).json({ message: 'No movies found in the given year.' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch movies.', error: error });
    }
};
