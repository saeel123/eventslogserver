const mongoose = require('mongoose')

mongoose.connect('mongodb://saeel:saeel123@ds259377.mlab.com:59377/eventslogs?retryWrites=true',{
    useNewUrlParser: true
}).then(() => console.log('Mongo Db connected.....')).catch(err => console.log(err));