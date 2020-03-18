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

//Production config
if(process.env.NODE_DEV === 'production'){
    app.use(express.static(`${__dirname}/public/`))

    app.get(/.*/, (req, res) => res.sendFile(`${__dirname}/public/idex.html`))
}

var uri = process.env.MONGO_URI

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true})


app.listen(process.env.PORT || 3333)