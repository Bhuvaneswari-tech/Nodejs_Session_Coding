/*
Promise Chaining
When you run multiple asynchronous operations one after the another, each starting
after the previous one completes
*/

new Promise((resolve)=>{
    setTimeout(()=>resolve("Step1 done"),1000)
})

.then((msg)=>{
    console.log(msg)
    return new Promise((resolve)=>{
        setTimeout(()=>resolve("Step 2 done"), 1000)
    })
})

.then((msg)=>{
    console.log(msg)
    return new Promise((resolve)=>{
        setTimeout(()=>resolve("Step 3 done"),1000)
    })
})

.then((msg)=>console.log(msg))
.catch((err)=>console.error(err))