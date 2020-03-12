const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    itens: [{id: String, quantity: Number}],
    total: {
        type: Number,
        default: 0
    },
    coupon: String
})

var Cart = module.exports = mongoose.model('cart', cartSchema)

module.exports.get = (callback, limit) => Cart.find(callback).limit(limit);