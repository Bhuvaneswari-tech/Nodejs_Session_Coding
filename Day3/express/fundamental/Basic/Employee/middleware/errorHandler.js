function errorHandler(err,req,res,next){
    const status = err.status || 500
    const message = err.message || 'Internal Server Error'
    const response = {error: {message,status}}

    //includes details if validation error exist
    if(err.details) response.error.details = err.details

    //log error server-side 
    if(err.stack) console.error(err.stack)

    res.status(status).json(response)

}

module.exports = errorHandler