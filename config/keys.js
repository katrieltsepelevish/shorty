const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    databaseUri: process.env.DATABASE_URL || 'mongodb://localhost:27017/shorty',
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
}
