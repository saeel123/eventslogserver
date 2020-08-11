
var Controller, amqp, express, router;

express       = require('express');
 
router        = express.Router();

Controller    = require('../core/controller');

event         = require('../controllers/event-controller');

Event_Logger = new event();

/*
@api {get} /event/ Get Events
@apiName Get Events
@apiGroup Events

@apiParam {String} verb verb.
@apiParam {String} message message.
@apiParam {String} author author.
@apiParam {String} target_year target_year.
@apiParam {String} startDate startDate.
@apiParam {String} endDate endDate.
@apiParam {String} sortBy sortBy.
@apiParam {String} page page.
@apiParam {String} limit limit.

@apiSuccess (200) {Json} Events information.
@apiSuccessExample {json} Success-Response:
	HTTP/1.1 200 OK
	{
    "success": true,
    "data": [
        {
            "_id": "5f2ed4af5fc9830e5fd89fa1",
            "subject": "Product",
            "message": "Developer Tools published a product on Online Store: <a href=\"https://full-stack-dev-test.myshopify.com/admin/products/5580038996118\">DIY Bath Bomb</a>.",
            "author": "Developer Tools",
            "event_created_at": "2020-08-06T10:53:56.000Z",
            "event_id": "56306074878102",
            "verb": "published",
            "__v": 0
        },
        {
            "_id": "5f2ed4af5fc9830e5fd89fa3",
            "subject": "Product",
            "message": "Developer Tools published a product on Online Store: <a href=\"https://full-stack-dev-test.myshopify.com/admin/products/5580039028886\">Bangle Bracelet With Jewels</a>.",
            "author": "Developer Tools",
            "event_created_at": "2020-08-06T10:53:56.000Z",
            "event_id": "56306075173014",
            "verb": "published",
            "__v": 0
        },
        {
            "_id": "5f2ed4ac5fc9830e5fd89f9a",
            "subject": "Product",
            "message": "Developer Tools created a new product: <a href=\"https://full-stack-dev-test.myshopify.com/admin/products/5580038799510\">Coffee Beans And Cup</a>.",
            "author": "Developer Tools",
            "event_created_at": "2020-08-06T10:53:55.000Z",
            "event_id": "56306073010326",
            "verb": "create",
            "__v": 0
        },
        {
            "_id": "5f2ed4ac5fc9830e5fd89f99",
            "subject": "Product",
            "message": "Developer Tools published a product on Online Store: <a href=\"https://full-stack-dev-test.myshopify.com/admin/products/5580038701206\">Pink Patterned iPhone Case</a>.",
            "author": "Developer Tools",
            "event_created_at": "2020-08-06T10:53:55.000Z",
            "event_id": "56306072813718",
            "verb": "published",
            "__v": 0
        },
        {
            "_id": "5f2ed4ac5fc9830e5fd89f97",
            "subject": "Product",
            "message": "Developer Tools published a product on Online Store: <a href=\"https://full-stack-dev-test.myshopify.com/admin/products/5580038668438\">4 Ounce Soy Candle</a>.",
            "author": "Developer Tools",
            "event_created_at": "2020-08-06T10:53:55.000Z",
            "event_id": "56306072551574",
            "verb": "published",
            "__v": 0
        },
        {
            "_id": "5f2ed4ac5fc9830e5fd89f9c",
            "subject": "Product",
            "message": "Developer Tools created a new product: <a href=\"https://full-stack-dev-test.myshopify.com/admin/products/5580038832278\">Fitness Product Blue Roller Details</a>.",
            "author": "Developer Tools",
            "event_created_at": "2020-08-06T10:53:55.000Z",
            "event_id": "56306073436310",
            "verb": "create",
            "__v": 0
        },
        {
            "_id": "5f2ed4ac5fc9830e5fd89f98",
            "subject": "Product",
            "message": "Developer Tools created a new product: <a href=\"https://full-stack-dev-test.myshopify.com/admin/products/5580038701206\">Pink Patterned iPhone Case</a>.",
            "author": "Developer Tools",
            "event_created_at": "2020-08-06T10:53:55.000Z",
            "event_id": "56306072617110",
            "verb": "create",
            "__v": 0
        },
        {
            "_id": "5f2ed4ac5fc9830e5fd89f9d",
            "subject": "Product",
            "message": "Developer Tools published a product on Online Store: <a href=\"https://full-stack-dev-test.myshopify.com/admin/products/5580038832278\">Fitness Product Blue Roller Details</a>.",
            "author": "Developer Tools",
            "event_created_at": "2020-08-06T10:53:55.000Z",
            "event_id": "56306073600150",
            "verb": "published",
            "__v": 0
        },
        {
            "_id": "5f2ed4ac5fc9830e5fd89f96",
            "subject": "Product",
            "message": "Developer Tools created a new product: <a href=\"https://full-stack-dev-test.myshopify.com/admin/products/5580038668438\">4 Ounce Soy Candle</a>.",
            "author": "Developer Tools",
            "event_created_at": "2020-08-06T10:53:55.000Z",
            "event_id": "56306072518806",
            "verb": "create",
            "__v": 0
        },
        {
            "_id": "5f2ed4ac5fc9830e5fd89f9b",
            "subject": "Product",
            "message": "Developer Tools published a product on Online Store: <a href=\"https://full-stack-dev-test.myshopify.com/admin/products/5580038799510\">Coffee Beans And Cup</a>.",
            "author": "Developer Tools",
            "event_created_at": "2020-08-06T10:53:55.000Z",
            "event_id": "56306073206934",
            "verb": "published",
            "__v": 0
        }
    ],
    "count": 10,
    "error": []
    }

*/
router.get('/', function(req, res) {
  return Event_Logger.getEvents(req, res);
});


router.post('/sync', function(req, res) {
    return Event_Logger.syncEvents(req, res);
  });

module.exports = router;
