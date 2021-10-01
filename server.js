const express = require('express')
const path = require('path')
const morgan = require('morgan')
const colors = require('colors')

const connectDB = require('./utils/database')
const config = require('./config/keys')

const handleErrors = require('./middlewares/handleErrors')

// Connect to MongoDB
connectDB(config.databaseUri)

// Initialize application
const app = express()

app.use(express.json())

if (config.environment === 'development') app.use(morgan('dev'))

// Routes
const urlRoutes = require('./routes/api/url')
app.use('/api/url', urlRoutes)

// Parsing middleware for handling errors
app.use(handleErrors)

// Serve static assets if in productions
if (config.environment === 'production') {
    // Set static folder
    app.use(express.static('client/build'))
    // Load static file
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// Start server
app.listen(
    config.port,
    console.log(
        `Server running in ${config.environment} mode on PORT ${config.port}`
            .yellow.bold
    )
)
