const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const router = require('./routes')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()

dotenv.config()

app.use(bodyparser.json())
app.use(cors()) 

app.use('/api', router)
app.use(bodyparser.urlencoded({
    extended: true
}))



var uri = process.env.MONGO_URI

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true})

app.get('/api')

app.listen(process.env.PORT || 3333)