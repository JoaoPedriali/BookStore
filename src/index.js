const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const router = require('./routes')
const bodyparser = require('body-parser')
const app = express()

dotenv.config()

var port = process.env.PORT || 8080

app.use('/api', router)
app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json())

var uri = process.env.MONGO_URI

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true})

app.get('/',(req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})