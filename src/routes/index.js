'use strict'
const express = require('express')
const tankRoutes = require('./resource.routes')
const authRoutes = require('./auth.routes')

const router = express.Router()
router.use('/auth', authRoutes)

router.use('/tanks', tankRoutes)

module.exports = router