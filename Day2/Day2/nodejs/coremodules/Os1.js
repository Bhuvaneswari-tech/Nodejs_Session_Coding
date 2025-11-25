const os = require('os')

let currentOS = {
    name: os.type(),
    architecture: os.arch(),
    platform: os.platform(),
    release: os.release(),
    version: os.version()
}

console.log(currentOS)

//Server uptime
console.log(`The server has been up to ${os.uptime()} seconds.`)

//Getting the current user information
console.log(os.userInfo())

//Server total memory in bytes
console.log(os.totalmem())

//Free memory in bytes
console.log(os.freemem())

//Model and speed of the server CPU
const {model,speed} = os.cpus()[0]

console.log(`Model: ${model}`)
console.log(`Speed: ${speed}`)