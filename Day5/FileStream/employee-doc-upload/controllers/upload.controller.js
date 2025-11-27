const fs = require("fs")
const path = require('path')

exports.uploadDocument = async(req,res)=>{
    try{
        //Finding the file from query
        const fileName = req.query.name || 'uploaded_document'

        //Destination path
        const filePath = path.join(__dirname,'..','uploads',fileName)

        //Create writeable Stream 
        const writeSteam = fs.createWriteStream(filePath)

        //Pipe request stream -> file stream
        res.pipe(writeSteam)

        //When upload finishes
        writeSteam.on('finish',()=>{
            res.status(200).json(
                {
                    message: 'File uploaded successfully (streamed)',
                    file : fileName
                }
            )
        })

        //Catch file system error
        writeSteam.on('error',(err)=>{
            console.error('Write Error: ',err)
            res.status(500).json({error: 'Upload failed'})
        })

    }
    catch(error){
        console.error(error)
        res.status(500).json({error: 'Server error'})
    }
}
