var express = require('express');
var app = express();

app.use(express.json());

// Middleware function to log request protocol
app.use((req, res, next) => {
    console.log(`Request Type : ${req.method} - Request Protocol: ${req.protocol}, URL: '${req.url}' }`);
    next(); // Pass control to the next handler
});

//Import your routes
var routes = require('./Ex2.js');
app.use('/routes', routes);

//Rote handle that sends a response
app.use (function(req, res, next) {
    res.send('This is a response from the middleware.');
});

app.listen(3000);