var ObjectId, Schema, db, schema, util;

db          = require('../core/database');

util        = require('../lib/utilities');

Schema      = db.Database.Schema;

ObjectId    = Schema.Types.Oid;

schema = new Schema({
  id: ObjectId,
  subject: {
    type: String,
  },
  message: {
      type: String,
  },
  author: {
      type: String,
  },
  event_created_at: {
      type: Date,
  },
  event_id: {
      type: String,
  },
  verb: {
      type: String,
  }
}, {
    timestamps: true
});

Events = db.Database.model('events', schema);

Events.getEvents = function(req, callback) {

    options = db.ListProcessor.process(req);
    options.conditions = {}

    //date filter
    if((req.query.startDate) && (req.query.endDate)){
        options.conditions.event_created_at = {$lt: new Date(req.query.endDate*1000).toISOString(), $gte: new Date(req.query.startDate*1000).toISOString()}
    }
    
    if((req.query.startDate) && (!req.query.endDate)){
        options.conditions.event_created_at = {$gte: new Date(req.query.startDate*1000).toISOString()}
    }
    
    if((!req.query.startDate) && (req.query.endDate)){
        options.conditions.event_created_at = {$lt: new Date(req.query.endDate*1000).toISOString()}
    }

    //verb filter
    if(req.query.verb){
        if(req.query.verb != "all"){
            options.conditions.verb  =  {$regex: new RegExp('.*'+ req.query.verb.toString().trim(),"i")}
        }
    }

    //message filter
    if(req.query.message){
        if(req.query.message != "all"){
            options.conditions.message  =  {$regex: new RegExp('.*'+ req.query.message.toString().trim(),"i")}
        }
    }

    //author filter
    if(req.query.author){
        if(req.query.author != "all"){
            options.conditions.author  =  {$regex: new RegExp('.*'+ req.query.author.toString().trim(),"i")}
        }
    }

    return util.async.waterfall([
        function(callback) {
          return Events.find(options.conditions,{}, options.pagination,function(error, events) {
                if (error) {
                return callback(util.formatError(error,"Error while fetching events."));
                }
                return callback(null, events);
            }).sort(options.sort);
        },
        function(events, callback) {
            return Events.count(options.conditions,
            function(error, events_count) {
                if (error) {
                    return callback(util.formatError(error, "Error while fetching events count"));
                }
                return callback(null,[events,events_count]);
            });
        },
        function(data, callback) {
            return Events.count({},
            function(error, total_events_count) {
                if (error) {
                    return callback(util.formatError(error, "Error while fetching events total count"));
                }
                return callback(null,
                {
                    data                : data[0],
                    count               :data[1],
                    total_events_count  : total_events_count
                });
            });
        }
      ], function(error, result) {
        return callback(error, result);
      });

};

Events.syncEvents= function(req, callback) {

    //write your sync code here
    

};


module.exports = Events;