const swaggerJSDoc = require('swagger-jsdoc')

const config = require('./config.json')

const options = {
    openapi: '3.0.3',
    info: {
        title: 'Employee API',
        version: config.apiVersion,
        description: 'Employee API with logging, token auth, validation,cookies, CORS, Swagger '
    },
    servers:[
        {url:`http://localhost:${config.port}/api/${config.apiVersion}`}
    ],
    components:{
        securitySchemes:{
            ApiToken:{
                type:'apiKey',
                in:'header',
                name:'x-auth-token',
                description:'Provide your API token'
            }
        },
        security: [{ApiToken:[]}]
    },
    apis: ['./routes/v1/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec