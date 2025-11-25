//jsonplaceholder

// function getUser(){
//     return new Promise((resolve, reject)=>{
//         fetch("https://jsonplaceholder.typicode.com/users/1")
//         .then((res)=>{
//             if(!res.ok){
//                 reject("Network response was not ok")
//             }
//             return res.json()
//         })
//         .then((data)=>resolve(data))
//         .catch((err)=>reject(err))
//     })
// }

// getUser()
// .then((user)=>{
//     console.log("User Data:")
//     console.log(user)
// })
// .catch((err)=>{
//     console.error(err)
// })

fetch('https://jsonplaceholder.typicode.com/users/1')
.then((res)=>res.json())
.then((user)=>{
    console.log("User Data:")
    console.log(user)
})
.catch((err)=>console.error(err))