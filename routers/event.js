const express = require('express')
const Event = require('../models/event')
const router = new express.Router()
const fetch = require('node-fetch');
const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: 'https://full-stack-dev-test.myshopify.com/admin/api/2020-01',
    headers: { 'X-Shopify-Access-Token': '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', 'Content-Type': 'application/json' },
});

const saveEvents = function (results) {
    console.log(results.events.length);
    results.events.forEach((event) => {
        const eventObj = {
            subject: event.subject_type,
            message: event.message,
            author: event.author,
            event_created_at: event.created_at,
            event_id: event.id,
            verb: event.verb
        }
        const newEvent = new Event(eventObj)
        newEvent.save()
    });
}

let originalRes = null

const checkNextUrl = function (response) {
    if (response.headers.link && response.headers.link.indexOf(`rel="next"`) > -1) {
        try {
          let nextLink = response.headers.link;
          if (nextLink.indexOf(`rel="previous"`) > -1) {
            nextLink = nextLink.substr(nextLink.indexOf(",") + 2, nextLink.length);
          } 
          nextLink = nextLink.substr(1, nextLink.indexOf(">") - 1);
          callNextEventsPage(nextLink)
            
        } catch(ex) {
            console.log( 'Failed to parse nextlink');
            originalRes.status(201).send({message: 'Error occured on syn', success: false});
            console.log(response.headers)
        }
    } else {
        originalRes.status(201).send({message: 'Events Synced', success: true});
    }
}

const callNextEventsPage = function (url) {
    axios( {
            method: 'get',
            url: url,
            headers: { 'X-Shopify-Access-Token': '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', 'Content-Type': 'application/json' }
    })
    .then(function (response) {
        saveEvents(response.data);
        checkNextUrl(response);            
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        // always executed
    }); 
}




router.get('/syncevent', async (req, res) => {
    originalRes = res;
    
    try {

        const getLocalEventCount = new Promise((resolve, reject) => {
            Event.count({}, function( err, count){
            resolve(count);
            });
        });
        
        const getRemoteEventCount = new Promise((resolve, reject) => {
            axiosInstance.get('/events/count.json').then( response => {
                resolve(response.data.count);
            }).catch(error => {
                return reject('error occured while fetching records');
            });
        });
        
        const getFirstLocalLatestEvent = new Promise((resolve, reject) => {
            const event = Event.findOne({})
            .sort({'event_id' : -1 });
            resolve(event);
        });

        let localDbEventsCount = await getLocalEventCount;
        console.log(localDbEventsCount);
        
        if (localDbEventsCount === 0) {
            const response = await axiosInstance.get('/events.json?limit=250');
            saveEvents(response.data);
            checkNextUrl(response, res);  

        } else {
            let remoteDbEventsCount = await getRemoteEventCount;
            console.log(remoteDbEventsCount);
            if (localDbEventsCount === remoteDbEventsCount) {
                res.status(201).send({message: 'Events Synced', success: true})
            } else {
                console.log("get first record Dump");
                const event = await getFirstLocalLatestEvent
                const response = await axiosInstance.get('/events.json?limit=250&since_id='+event.event_id);

                if (response.data.events.length === 0) {
                    res.status(201).send({message: 'Events Synced', success: true});
                } else {
                    saveEvents(response.data);
                    checkNextUrl(response, res);          
                };
            }
        }

    } catch (error) {
        console.error(error);
    }
});

module.exports = router