export function runEventLoopDemo(){
    setTimeout(()=>console.log("4. setTimeout executed(Timers Phase)."),0),
    setTimeout(()=>console.log("5. setImmediate executed(check Phase)."))
}