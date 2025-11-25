import { fetchMovieFromAPI } from "./api/movieAPI.js";
import { readConfig } from "./fs/configReader.js";
import { runEventLoopDemo } from "./loop/eventLoopDemo.js";

async function main(){
    console.log("1. Dashboard loading started...")

    //Run event loop demo
    runEventLoopDemo()

    //start non-blocking tasks
    const moviePromise = fetchMovieFromAPI(101)
    const configPromise = readConfig()

    console.log("2. API request and file read started(non-blocking).")

    //Await results async
    const movie = await moviePromise
    console.log("6. Movie API Response: ", movie)

    const config = await configPromise
    console.log("7. Config File Loaded:",config)

    console.log("8. Dashboard loaded successfully")
}

main()