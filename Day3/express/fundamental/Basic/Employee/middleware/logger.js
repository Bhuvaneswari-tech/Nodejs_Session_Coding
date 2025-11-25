function logger(req,res, next){
    const time = new Date().toISOString()
    const route = req.originalUrl
    const method = req.method

    const token = req.headers['x-auth-token']?'***': 'None'

    console.log(`[${time}] ${method} ${route} - token: ${token}`)
    next()
}

module.exports = logger