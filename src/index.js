const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes')
const bodyparser = require('body-parser')
const app = express()


var port = process.env.PORT || 8080

app.use('/api', router)
app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json())

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})



app.get('/',(req, res) => {
    res.send('Hello world')
})

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})
 
console.log(process.env.MONGO_URL)