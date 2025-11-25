// const express = require('express')
// const app = express()
// const config = require('./config.json')

// const cookieParser = require('cookie-parser')
// const cors = require('cors')

// const logger = require('./middleware/logger.js')
// const auth = require('./middleware/auth.js')
// const errorHandler = require('./middleware/errorHandler.js')

// const employeesRouter = require('./routes/v1/employee.js')

// //Third party middleware
// app.use(express.json())
// app.use(cookieParser())
// app.use(cors({
//     origin: config.corsOrigin,
//     methods: ['GET','POST','PUT','DELETE','OPTIONS'],
//     allowedHeaders: ['Content-type','x-auth-token'],
//     credentials: true
// }))

// //Custom middleware
// app.use(logger)

// //Mount the routes
// app.use('/employees',employeesRouter)



// app.use((req,res,next)=>{
//     const err = new Error('Route not found')
//     err.status = 404
//     next(err)
// })

// app.use(errorHandler)

// app.listen(config.port,()=>{
//     console.log(`Employee API running at http://localhost:${config.port}`)
// })

const express = require('express');
const app = express();
const config = require('./config.json');

const cookieParser = require('cookie-parser');
const cors = require('cors');

const logger = require('./middleware/logger.js');
const auth = require('./middleware/auth.js');
const errorHandler = require('./middleware/errorHandler.js');

const employeesRouter = require('./routes/v1/employee.js');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// ----------------------------
// Third-party middleware
// ----------------------------
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: config.corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token'],
  credentials: true
}));

// ----------------------------
// Custom middleware
// ----------------------------
app.use(logger);

// ----------------------------
// Swagger setup
// ----------------------------
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee API',
      version: '1.0.0',
      description: 'Employee Management API with Logging, Auth, and Validation'
    },
    servers: [
      { url: `http://localhost:${config.port}` }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/v1/*.js'], // path to your routes with swagger comments
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ----------------------------
// Mount routes
// ----------------------------
app.use('/employees', employeesRouter);

// ----------------------------
// 404 handler
// ----------------------------
app.use((req, res, next) => {
  const err = new Error('Route not found');
  err.status = 404;
  next(err);
});

// ----------------------------
// Global error handler
// ----------------------------
app.use(errorHandler);

// ----------------------------
// Start server
// ----------------------------
app.listen(config.port, () => {
  console.log(`Employee API running at http://localhost:${config.port}`);
  console.log(`Swagger docs available at http://localhost:${config.port}/api-docs`);
});
