/*
What is a Promise?
Promise is an object in JS that represents a value that will be available all
the time

3 stages:
Pending -> Waiting
Fulfilled -> Success(resolve)
Rejected -> Failure(reject)
*/

const p = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        let success = false
        if(success){
            resolve("Data loaded")
        }
        else{
            reject("Failed to load data")
        }
        
    },1000)
})

p.then(
    (res)=>console.log(res),
    (err) => console.log("Error:", err)
);