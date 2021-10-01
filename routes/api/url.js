const express = require('express')
const shortid = require('shortid')
const validUrl = require('valid-url')

const { BadRequest, NotFound } = require('../../utils/errors')

const router = express.Router()

// Load URL model
const URL = require('../../models/Url')

// @route   POST /api/url
// @desc    Create a short URL
// @access  Public
router.post('/', async (req, res, next) => {
    const { url } = req.body

    try {
        if (!url) throw new BadRequest('Missing required field "Url"')

        // Validate URL format
        if (!validUrl.isUri(url))
            throw new BadRequest('The provided "URL" is not a valid')

        const isUrlAlreadyExists = await URL.findOne({ url })

        if (isUrlAlreadyExists)
            return res.status(201).json({
                status: 'success',
                data: isUrlAlreadyExists,
            })

        // Generate redirection token
        const generateHash = shortid.generate()

        const newUrl = await URL.create({ url, hash: generateHash })

        res.status(201).json({
            status: 'success',
            data: newUrl,
        })
    } catch (error) {
        next(error)
    }
})

// @route   GET /api/url/:hash
// @desc    Redirect to saved URL
// @access  Public
router.get('/:hash', async (req, res, next) => {
    const { hash } = req.params

    try {
        const requestedUrl = await URL.findOne({ hash })

        if (!requestedUrl)
            throw new NotFound('The provided "hash" does not exist in records')

        // Increase the URL clicks counter
        requestedUrl.counter++
        requestedUrl.save()

        res.status(200).json({
            status: 'success',
            data: requestedUrl,
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router
