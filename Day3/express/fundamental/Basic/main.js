var express = require('express');
var app = express();
var port = 3000;
 var router = require('./Ex2');
app.use('/routes', router);

app.listen(port, function(){
    console.log(`Server is running on port ${port}`);
});


