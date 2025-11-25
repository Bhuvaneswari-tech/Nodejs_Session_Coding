var express = require('express');
var app = express();

const router = express.Router();
const movies = require('../data/movies.js');

const validateApiKey = require('../middleware/validateAPiKey.js');

// Apply the API key validation middleware to all routes in this router
router.use(validateApiKey);

// GET /movies - Retrieve all movies
router.get('/', validateApiKey, (req, res) => {
    res.send(movies);
});

//POST /movies - Add a new movie
router.post('/', validateApiKey,(req, res) => {
    const {id, name, director, year} = req.body
    if(!id || !name || !director){
        return res.status(400).send('Missing required movie fields: id, name, director');
    }

    //take care of duiplicate IDs in POST /movies
    const existingMovie = movies.some(movie => movie.id === id);
    if (existingMovie) {
        return res.status(400).send('Movie with this ID already exists');
    }

    movies.push({ id, name, director, year });
    res.status(201).send({ message: 'Movie added successfully',movies });
});

// GET /movies/:id - Retrieve a movie by ID
router.get('/:id', validateApiKey,(req, res) => {
    const id = parseInt(req.params.id);
    const movie = movies.find(m => m.id === id);
    if (!movie) {
        return res.status(404).send('Movie not found');
    }
    res.send(movie);
});

module.exports = router;
