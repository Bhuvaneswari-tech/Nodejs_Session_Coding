const fs = require("fs")

const data = 'Hi! this is newFile data'

fs.writeFile('./myFolder/myFile.txt',data,(err)=>{
    if(err){
        console.error(err)
        return
    }
    console.log('Written to file successfully')
})

/*
readdir - read a directory
rename - rename the file
unlink - delete a file
*/