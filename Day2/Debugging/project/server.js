const http = require("http");
const { handleHomeRoute, handleSumRoute } = require("./app");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        handleHomeRoute(req, res);
    } 
    else if (req.url === "/sum") {
        handleSumRoute(req, res);
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Route Not Found");
    }
});

server.listen(5001, () => {
    console.log("Server running on http://localhost:5001");
});
