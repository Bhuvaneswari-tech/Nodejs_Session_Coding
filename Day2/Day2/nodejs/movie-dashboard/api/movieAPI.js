//Simulates non-blocking API request for movie metadata

export function fetchMovieFromAPI(movieId){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({
                id: movieId,
                title: 'The Matrix',
                rating: 8.7
            })
        },1500) //simulate API delay
    })
}