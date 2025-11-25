//Non blocking code - Callback function

var fs = require("fs")

console.log('File reading...')
fs.readFile('input.txt',function(err,data){
    if(err)return console.error(err)
    console.log(data.toString())
})

console.log('Program Ends')