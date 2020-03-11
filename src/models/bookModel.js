const mongoose = require('mongoose')

//Creates the model of an entry in the database
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Number,
        required: true
    },
})

var Book = module.exports = mongoose.model('contact', contactSchema)

module.exports.get = (callback, limit) => Book.find(callback).limit(limit);