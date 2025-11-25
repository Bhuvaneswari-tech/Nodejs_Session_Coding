const http = require('http')

http.createServer((req,res)=>{
    //send a chunk of the reponse body
    res.write('Hello World')

    //signals server that all res body has been sent
    res.end()
}).listen(3000)

console.log('Server started on port 3000')

