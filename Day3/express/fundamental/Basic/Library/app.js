const express = require('express')
const app = express()

const bookRoutes = require('./routes/books.js')

app.use('/books', bookRoutes)

app.listen(6000,()=>console.log("Library API running..."))