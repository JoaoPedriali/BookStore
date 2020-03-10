const express = require('express')
const mongoose = require('mongoose')

const app = express()

var port = process.env.PORT || 8080



app.get('/',(req, res) => {
    res.send('Hello world')
})

app.listen()
 
console.log(process.MONGO_URL)