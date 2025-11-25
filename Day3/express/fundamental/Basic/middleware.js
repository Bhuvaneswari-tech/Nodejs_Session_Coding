var express = require('express');
var app = express();

// Middleware function to log request protocol
app.use('/test', function(req, res, next) {
    console.log(`${req.method} request for '${req.url}' test recieved at ${new Date().toISOString()}`);
    next(); // Pass control to the next handler
}   );

app.get('/test', function(req, res) {
    res.send('This is the test route with middleware logging.');
});

app.listen(3000);