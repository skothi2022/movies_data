import { Request, Response, NextFunction } from 'express';
import { fetchMovies, fetchMovieCredits } from '../api/movie';

export const getMoviesByPopularity = async (req: Request, res: Response): Promise<void> => {
    const { year, page = 1 } = req.query;

    if (!year || isNaN(Number(year))) {
        res.status(400).json({ error: 'Year is required and must be a valid number.' });
        return;
    }

    try {
        const movieResponse = await fetchMovies({
            language: 'en-US',
            sort_by: 'popularity.desc',
            page,
            primary_release_year: year,
        });

        const movies = await Promise.allSettled(
            movieResponse.data.results.map(async (movie: any) => {
                try {
                    const creditsResponse = await fetchMovieCredits(movie.id);
                    const editors = creditsResponse.data.crew
                        .filter((crew: any) => crew.known_for_department === 'Editing')
                        .map((editor: any) => editor.name);
                    return { ...movie, editors };
                } catch {
                    return { ...movie, editors: [] };
                }
            })
        );

        const result = movies
            .filter((movie) => movie.status === 'fulfilled')
            .map((movie: any) => movie.value);

        res.json(result);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Failed to fetch movies.' });
    }
};
