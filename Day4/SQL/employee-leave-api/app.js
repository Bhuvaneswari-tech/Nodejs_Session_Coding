require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const swaggerDocs = require('./swagger');
const employeeRoutes = require('./routes/employee.routes');
const leaveRoutes = require('./routes/leave.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);

// Swagger
swaggerDocs(app);

app.use('/auth', authRoutes);
app.use('/employees', employeeRoutes);
app.use('/leaves', leaveRoutes);

app.get('/', (req, res) => res.send('Employee Leave Management API'));

// Error handler last
app.use(errorHandler);

module.exports = app;
