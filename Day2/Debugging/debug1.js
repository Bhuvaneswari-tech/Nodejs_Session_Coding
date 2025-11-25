// A simple CPU-heavy function (clearly named)
function sumUntil(limit) {
    let sum = 0;

    // A simple loop that Chrome DevTools can track
    for (let i = 0; i < limit; i++) {
        sum += i;
    }

    return sum;
}

// A controller function that calls the CPU function
function calculateSumTask() {
    console.log("Starting sum calculation...");

    const result = sumUntil(50_000_000);  // heavy operation

    console.log("Final Sum:", result);
}

// Main execution function
function main() {
    calculateSumTask();
    console.log("Program completed.");
}

main();
