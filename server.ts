import app from './app';
const config = require('./config/config');


app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
});