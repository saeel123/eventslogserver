const express = require('express')
const Event = require('../models/event')
const router = new express.Router()
const fetch = require('node-fetch');

function checkStatus(res) {
    if (res.ok) { 
        parseHeader(res.headers)
        return res.json();
    } else {
        throw MyCustomError(res.statusText);
    }
}

function parseHeader(header) {
    console.log("header");
    console.log(header.link);
    console.log("header");    
}


router.get('/syncevent', async (req, res) => {
    

    fetch('https://full-stack-dev-test.myshopify.com/admin/api/2020-01/events.json', {
        method: 'get',
        headers: { 'X-Shopify-Access-Token': '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', 'Content-Type': 'application/json' },
    })
    .then(checkStatus)
    .then(json => { 
        console.log(json)
    });





})

module.exports = router