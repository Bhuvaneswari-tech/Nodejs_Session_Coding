// Simple function that does some CPU work
function calculateSum(limit) {
    let sum = 0;

    for (let i = 0; i < limit; i++) {
        sum += i;
    }

    return sum;
}

// Home route
function handleHomeRoute(req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the Home Page");
}

// Route that uses the function
function handleSumRoute(req, res) {
    const result = calculateSum(50_000_00); // Intentional CPU work

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Sum Result: " + result);
}

module.exports = { handleHomeRoute, handleSumRoute };
