const express = require('express')
const Event = require('../models/event')
const router = new express.Router()
const fetch = require('node-fetch');
const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: 'https://full-stack-dev-test.myshopify.com/admin/api/2020-01',
    headers: { 'X-Shopify-Access-Token': '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', 'Content-Type': 'application/json' },
});


const getRemoteEventsCount = () => {
    return new Promise((resolve, reject) => {
        axiosInstance.get('/events/count.json').then( response => {
            resolve(response.data);
         }).catch(error => {
            return reject('issue occured while fetching count');
         });
    })
}


const checkEventsStatus = async () => {
        const dbEventCount = await Event.count({});
        const remoteEventCount = await getRemoteEventsCount();

        if (dbEventCount === 0) {
            return {type: 1, count: remoteEventCount.count}; //initial fetch all
        }

}

const fetchRemoteEvents = async (params) => {
    params = params || null;
    try {
      const response = await axiosInstance.get('/events.json', {
        params: params
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }


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
            console.log(response.headers)
        }
    } else {
        console.log('SHOPIFY SERVICE - GETALLORDERS', 'No nextLink returned, continuing.')
        response.status(201).send("Events Synced")
    }
}

const saveEvents = function (results) {
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

const callNextEventsPage = function (url) {
    axios( {
            method: 'get',
            url: url,
            headers: { 'X-Shopify-Access-Token': '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', 'Content-Type': 'application/json' }
    })
    .then(function (response) {
        console.log(response);
        
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
        axiosInstance.get('/events.json', {
          params: {limit: 250}
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
});



router.get('/event', async (req, res) => {
  const resPerPage = req.query.limit; 
  const page = req.query.page || 1; 

  try {
    const events = await Event.find({})
    .skip( parseInt((resPerPage * page) - resPerPage))
    .limit(parseInt(resPerPage));

    if (!events) {
        return res.status(404).send();
    }

    res.send(events);

  } catch (e) {
      res.status(500).send();
  }
});




module.exports = router