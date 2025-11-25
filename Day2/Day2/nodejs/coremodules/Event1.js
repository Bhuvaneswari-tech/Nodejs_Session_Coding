/*
Event driven programming is a programming paradigm where program flow is largely
determined by event or user actions, rather than by program's logic

emit() - causes an event to occur
on() - used to listen for a particular event
*/

const EventEmitter = require("events")
const myEmitter = new EventEmitter()

//Listener Function - welcomeUser()
const welcomeUser = () =>{
    console.log('Hi! there welcome to the server!')
}

myEmitter.on('userJoined', welcomeUser)

myEmitter.emit('userJoined')
