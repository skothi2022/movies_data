// Import dotenv to load environment variables
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Define the configuration object
const config = {
    server: {
        port: process.env.PORT || 3000,
    },
    tmdb: {
        discoverApi: process.env.TMDB_DISCOVER_API || 'https://api.themoviedb.org/3/discover/movie',
        creditsApi: process.env.TMDB_CREDITS_API || 'https://api.themoviedb.org/3/movie',
        bearerToken: process.env.TMDB_BEARER_TOKEN || '',
    },
    logs: {
        level: process.env.LOG_LEVEL || 'info',
    },
};

export default config;
