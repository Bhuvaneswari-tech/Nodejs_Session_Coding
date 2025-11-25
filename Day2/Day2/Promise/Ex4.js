/*
Requirement
1. Fetch a user
2. Fetch posts of that user
3. Fetch comments of the first post
4. Display them step by step
*/

fetch('https://jsonplaceholder.typicode.com/users/1')
.then((res)=>res.json())
.then((user)=>{
    console.log("Step 1 -> User Loaded")
    console.log(user)

    //Return another promise
    return fetch(`https://jsonplaceholder.typicode.com/post?userId=${user.id}`)
})
.then((res)=>res.json())
.then((posts)=>{
    console.log("Step 2 -> User's Post Loaded")
    console.log(posts)

    const firstPostId = posts[0].id

    return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${firstPostId}`)
})

.then((res)=>res.json())
.then((comments)=>{
    console.log("Step 3 -> Comments for First Post")
    console.log(comments)
})

.catch((err)=>console.error("Error happened:",err))