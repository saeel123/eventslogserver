const express = require('express')
const Event = require('../models/event')
const router = new express.Router()

router.get('/syncevent', async (req, res) => {
    res.send("test")
})

module.exports = router