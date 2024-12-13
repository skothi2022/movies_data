import app from './app';
const {config} = require('./config/config');

// Connecting to the configured port
app.listen(config.server.port, () => {
    console.log(`Server is running on http://localhost:${config.server.port}`);
});