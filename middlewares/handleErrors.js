const config = require('../config/keys')
const { GeneralError } = require('../utils/errors')

const handleErrors = (err, req, res, next) => {
    const statusCode = err instanceof GeneralError ? err.getCode() : 500

    res.status(statusCode)
    res.json({
        status: 'error',
        message: err.message,
        stack: config.environment === 'production' ? null : err.stack,
    })
}

module.exports = handleErrors
