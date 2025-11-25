var express = require('express');
var app = express();

var config = require('./config.json');

const logger = require('./middleware/logger.js');

const movieRoutes = require('./routes/movies.js');

app.use(express.json());

app.use(logger);

app.use('/movies', movieRoutes);

app.listen(config.port, function(){
    console.log(`Server is running on port ${config.port}`);
});
