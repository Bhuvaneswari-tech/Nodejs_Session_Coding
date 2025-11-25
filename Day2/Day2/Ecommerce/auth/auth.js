//Named exports
export function login(username,password){
    return username === "admin" && password === "admin123"
}

export function logout(){
    console.log("User Logged out")
}

//Default export
export default function isAuthenticated(){
    return true;
}