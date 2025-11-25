//without using callback function
//callback - asynchronous - multiple function can be executed parallely

//Blocking code

var fs = require("fs")
var data = fs.readFileSync("input.txt")

console.log(data.toString())
console.log('Program ends')