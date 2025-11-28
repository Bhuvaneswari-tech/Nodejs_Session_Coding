const cluster = require("cluster");
const http = require("http");
const os = require("os");

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died, restarting...`);
    cluster.fork();
  });
} else {
  // Worker processes
  const server = http.createServer((req, res) => {
    if (req.url === "/factorial") {
      let n = 25;
      let result = 1;
      for (let i = 2; i <= n; i++) result *= i; // CPU-intensive
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(`Factorial of ${n} is ${result}`);
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Hello from worker " + process.pid);
    }
  });

  server.listen(3000, () => console.log(`Worker ${process.pid} started`));
}