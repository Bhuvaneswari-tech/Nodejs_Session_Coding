const config = require('../config.json')

function auth(req,res,next){
    const token = req.headers['x-auth-token']

    if(!token){
        const err = new Error('Authentication token required!')//Custom error
        err.status = 401
        return next(err)
    }

    if(token != config.authToken){
        const err = new Error('Invalid authentication token')
        err.status = 403
        return next(err)
    }

    req.user = {token}
    next()
}

module.exports = auth