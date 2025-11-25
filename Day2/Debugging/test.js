// // string_hog.js

// Function that is intentionally slow (The bottleneck we want to find)
// function concatenateInefficiently(numIterations) {
//     let result = '';
//     // Concatenating inside a loop forces memory reallocation for every iteration
//     for (let i = 0; i < numIterations; i++) {
//         result += `The current number is ${i}.\n`; // The slow part
//     }

//     //The current number is 0. The current number is 1
//     //console.log(result)
//     return result.length;
// }

// // Function that calls the slow function
// // function runHeavyTask() {
// //     console.log("Starting CPU intensive task...");
// //     // Run the heavy task with a large number of iterations
// //     const finalLength = concatenateInefficiently(100000); 
// //     console.log(`Finished heavy task. Final string length: ${finalLength}`);
// // }

// // Function that calls the slow function
// function runHeavyTask() {
//     console.log("Starting CPU intensive task...");
//     // --- CHANGE THIS LINE ---
//     // Try 1 million (1,000,000) or 5 million (5,000,000) iterations
//     const finalLength = concatenateInefficiently(5000000); 
//     console.log(`Finished heavy task. Final string length: ${finalLength}`);
// }

// // Main execution function
// function main() {
//     runHeavyTask();
//     console.log("Application finished.");
// }

// main();

// Optimized string_hog.js

//Function that is now highly efficient
function concatenateEfficiently(numIterations) {
    // 1. Initialize an array to store string parts (Memory allocation is fast here)
    const stringParts = []; 
    
    // 2. Accumulate all parts using Array.push()
    // This is fast because V8 doesn't have to create a new, larger string in memory on every iteration.
    for (let i = 0; i < numIterations; i++) {
        stringParts.push(`The current number is ${i}.\n`); 
    }

    // 3. Join the entire array into a single string once at the end.
    // This is a single, highly optimized operation.
    const result = stringParts.join(''); 
    
    //console.log(result)
    return result.length;
}

// Function that calls the heavy task (now highly optimized)
function runHeavyTask() {
    console.log("Starting CPU intensive task (Optimized)...");
    
    // Call the new, efficient function
    const finalLength = concatenateEfficiently(5000000); 
    
    console.log(`Finished heavy task. Final string length: ${finalLength}`);
}

// Main execution function
function main() {
    runHeavyTask();
    console.log("Application finished.");
}

main();