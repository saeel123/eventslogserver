const { workerData, parentPort } = require('worker_threads');
const axios = require('axios');
const Event = require('./server/models/').events

const axiosInstance = axios.create({
    baseURL: 'https://full-stack-dev-test.myshopify.com/admin/api/2020-01',
    headers: {
        'X-Shopify-Access-Token': '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',
        'Content-Type': 'application/json'
    },
});

const saveEvents = function (results) {
    console.log("destroy");
    console.log(results.events.length);

    if(results){
        results.events.forEach((event) => {
            const eventObj = {
                subject: event.subject_type,
                message: event.message,
                author: event.author,
                event_created_at: event.created_at,
                event_id: event.id,
                verb: event.verb
            }
            
            const newEvent = new Event(eventObj);
            newEvent.save();
        });
    }
    
}


const checkNextUrl = function (response) {
    if (response.headers != undefined) {
        if (response.headers.link && response.headers.link.indexOf(`rel="next"`) > -1) {
            try {
                let nextLink = response.headers.link;
                if (nextLink.indexOf(`rel="previous"`) > -1) {
                    nextLink = nextLink.substr(nextLink.indexOf(",") + 2, nextLink.length);
                }
                nextLink = nextLink.substr(1, nextLink.indexOf(">") - 1);
                callNextEventsPage(nextLink)
            } catch (ex) {
                parentPort.postMessage({ data: workerData,status : 'Done with '+workerData+' sync' })
            }
        } else {
            parentPort.postMessage({ data: workerData,status : 'Done with '+workerData+' sync' })
        }
    }
}   
    

const main = async function () {

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
            const response1 = await axiosInstance.get('/events.json?limit=250&verb='+workerData);
            saveEvents(response1.data);
            checkNextUrl(response1);

        } else {
            let remoteDbEventsCount = await getRemoteEventCount;
            if (localDbEventsCount === remoteDbEventsCount) {
                parentPort.postMessage({ data: workerData, status : 'Done with '+workerData+' sync' })
            } else {
                const event = await getFirstLocalLatestEvent
                const response = await axiosInstance.get('/events.json?limit=250&since_id=' + event.event_id + '&verb='+workerData);

                if (response.data.events.length === 0) {
                    parentPort.postMessage({ data: workerData,status : 'Done with '+workerData+' sync' })
                } else {
                    saveEvents(response.data);
                    checkNextUrl(response);
                };
            }
        }

    } catch (error) {
        console.error(error);
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

main()
