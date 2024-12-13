import { Router } from 'express';
import { getMoviesByPopularity } from '../controllers/movieController';

const router = Router();

router.get('/movies', getMoviesByPopularity);

export default router;