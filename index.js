const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('./db/mongoose')

//router imports
const eventRouter = require('./routers/event')


app.use(express.json());
app.use(eventRouter)

//server 
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})