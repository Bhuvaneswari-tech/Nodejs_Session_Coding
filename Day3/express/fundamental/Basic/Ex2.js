var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send('This is the Basic Example 2 Route');
});

router.post('/', function(req, res){
    res.send('POST request to the Basic Example 2 Route');
});

router.get('/:id', function(req, res){
    const id = req.params.id;
    if(!/^\d+$/.test(id)){
        return res.status(400).send('Invalid ID format. ID should be a number.');
    }
    res.send('Route with ID: ' + id);
});

router.get('/:name/:age', function(req, res){
    res.send('Name: ' + req.params.name + ', Age: ' + req.params.age);
});

module.exports = router;