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
            console.log(response.headers)
        }
    } else {
        console.log('SHOPIFY SERVICE - GETALLORDERS', 'No nextLink returned, continuing.')
        originalRes.status(201).send("Events Synced")
    }
}

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
        // const newEvent = new Event(eventObj)
        // newEvent.save()
    });
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

        axiosInstance.get('/events.json', {
          params: {limit: 250}
        })
        .then(function (response) {
            saveEvents(response.data);
            checkNextUrl(response, res);            
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
  const sort = {}
  const where_conditions = {}


  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  //date filter
  if((req.query.startDate) && (req.query.endDate)){
    where_conditions.event_created_at = {$lt: new Date(req.query.endDate*1000).toISOString(), $gte: new Date(req.query.startDate*1000).toISOString()}
  }
  if((req.query.startDate) && (!req.query.endDate)){
    where_conditions.event_created_at = {$gte: new Date(req.query.startDate*1000).toISOString()}
  }
  if((!req.query.startDate) && (req.query.endDate)){
    where_conditions.event_created_at = {$lt: new Date(req.query.endDate*1000).toISOString()}
  }
  //verb filter
  if(req.query.verb){
    if(req.query.verb != "all"){
      where_conditions.verb  =  {$regex: new RegExp('.*'+ req.query.verb.toString().trim(),"i")}
    }
  }
  //message filter
  if(req.query.message){
    if(req.query.message != "all"){
      where_conditions.message  =  {$regex: new RegExp('.*'+ req.query.message.toString().trim(),"i")}
    }
  }
  //author filter
  if(req.query.author){
    if(req.query.author != "all"){
      where_conditions.author  =  {$regex: new RegExp('.*'+ req.query.author.toString().trim(),"i")}
    }
  }

 
  


  try {
    const events = await Event.find(where_conditions)
    .skip( parseInt((resPerPage * page) - resPerPage))
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