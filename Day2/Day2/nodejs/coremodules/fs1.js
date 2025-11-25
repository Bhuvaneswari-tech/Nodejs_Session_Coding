const fs = require("fs")

fs.mkdir('./myFolder',(error,files)=>{
    if(error){
        console.log(error)
        return
    }
    console.log('Directory created successfully')
})