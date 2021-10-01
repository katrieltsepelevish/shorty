const mongoose = require('mongoose')

const UrlSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
            trim: true,
        },
        hash: {
            type: String,
            unique: true,
            trim: true,
        },
        counter: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Url', UrlSchema)
