const EventEmitter = require("events")
const myEmitter = new EventEmitter()

const sayHello = () =>{
    console.log('Hello User')
}

const sayHi = () =>{
    console.log('Hi User')
}

const greetNewYear = () =>{
    console.log('Happy New Year')
}

const greetBirthday = (name,newAge) =>{
    console.log(`Happy Birthday ${name}. You are now ${newAge}`)
}

myEmitter.on('userJoined', sayHello)
myEmitter.on('userJoined', sayHi)
myEmitter.on('userJoined', greetNewYear)
myEmitter.on('birthdayEvent',greetBirthday)

myEmitter.emit('userJoined')
myEmitter.emit('birthdayEvent','John',24)