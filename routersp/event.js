const express = require('express')
const Event = require('../models/event')
const router = new express.Router()
const fetch = require('node-fetch');
const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: 'https://full-stack-dev-test.myshopify.com/admin/api/2020-01',
    headers: {
        'X-Shopify-Access-Token': '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',
        'Content-Type': 'application/json'
    },
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
        } catch (ex) {
            console.log('Failed to parse nextlink');
            originalRes.status(201).send({
                message: 'Error occured on syn',
                success: false
            });
        }
    } else {
        originalRes.status(201).send({
            message: 'Events Synced',
            success: true
        });
    }
}

const callNextEventsPage = function (url) {
    axios({
            method: 'get',
            url: url,
            headers: {
                'X-Shopify-Access-Token': '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',
                'Content-Type': 'application/json'
            }
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

//Sync API
router.get('/syncevent', async (req, res) => {
    originalRes = res;

    try {

        const getLocalEventCount = new Promise((resolve, reject) => {
            Event.count({}, function (err, count) {
                resolve(count);
            });
        });

        const getRemoteEventCount = new Promise((resolve, reject) => {
            axiosInstance.get('/events/count.json').then(response => {
                resolve(response.data.count);
            }).catch(error => {
                return reject('error occured while fetching records');
            });
        });

        const getFirstLocalLatestEvent = new Promise((resolve, reject) => {
            const event = Event.findOne({})
                .sort({
                    'event_id': -1
                });
            resolve(event);
        });

        let localDbEventsCount = await getLocalEventCount;

        if (localDbEventsCount === 0) {
            const response = await axiosInstance.get('/events.json?limit=250');
            saveEvents(response.data);
            checkNextUrl(response, res);

        } else {
            let remoteDbEventsCount = await getRemoteEventCount;
            if (localDbEventsCount === remoteDbEventsCount) {
                res.status(201).send({
                    message: 'Events Synced',
                    success: true
                })
            } else {
                const event = await getFirstLocalLatestEvent
                const response = await axiosInstance.get('/events.json?limit=250&since_id=' + event.event_id);

                if (response.data.events.length === 0) {
                    res.status(201).send({
                        message: 'Events Synced',
                        success: true
                    });
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


//get events
router.get('/event', async (req, res) => {
    const resPerPage = req.query.limit;
    const page = req.query.page || 1;
    const sort = {}
    const where_conditions = {}


    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    //date filter
    if ((req.query.startDate) && (req.query.endDate)) {
        where_conditions.event_created_at = {
            $lt: new Date(req.query.endDate * 1000).toISOString(),
            $gte: new Date(req.query.startDate * 1000).toISOString()
        }
    }
    if ((req.query.startDate) && (!req.query.endDate)) {
        where_conditions.event_created_at = {
            $gte: new Date(req.query.startDate * 1000).toISOString()
        }
    }
    if ((!req.query.startDate) && (req.query.endDate)) {
        where_conditions.event_created_at = {
            $lt: new Date(req.query.endDate * 1000).toISOString()
        }
    }
    //verb filter
    if (req.query.verb) {
        if (req.query.verb != "all") {
            where_conditions.verb = {
                $regex: new RegExp('.*' + req.query.verb.toString().trim(), "i")
            }
        }
    }
    //message filter
    if (req.query.message) {
        if (req.query.message != "all") {
            where_conditions.message = {
                $regex: new RegExp('.*' + req.query.message.toString().trim(), "i")
            }
        }
    }
    //author filter
    if (req.query.author) {
        if (req.query.author != "all") {
            where_conditions.author = {
                $regex: new RegExp('.*' + req.query.author.toString().trim(), "i")
            }
        }
    }

    try {
        const events = await Event.find(where_conditions)
            .skip(parseInt((resPerPage * page) - resPerPage))
            .limit(parseInt(resPerPage))
            .sort(sort)

        const count = await Event.count(where_conditions)
        const total_count = await Event.count({})
        const response = {
            data: events,
            count: count,
            total_count: total_count
        }

        if (!events) {
            return res.status(404).send();
        }

        res.status(200).send(response);
    } catch (e) {
        res.status(500).send();
    }
});


module.exports = router