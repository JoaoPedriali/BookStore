const Cart = require('../models/cartModel')
const Book = require('../models/bookModel')

//Creates a new cart
exports.new = (req,res) => {
    var cart = new Cart()

    cart.itens = req.body.itens
    cart.total = req.body.total
    cart.coupon = req.body.coupon

    cart.save((err) =>{

        if(err)
            res.send(err)

        res.json({
            message: "Cart Created",
            data: cart 
        })
    })
    
}

//get a specific cart
exports.view = (req, res) => {
    Cart.findById(req.params.cart_id, (err, cart) =>{
        if(err)
            res.send(err)

        res.json({
            message: "Cart Retrieved",
            data: cart
        })
    })
}

//Adds an item to the cart
exports.addItem = (req, res) => {
    Cart.findById(req.params.cart_id, async(err, cart) => {
        await Book.findById(req.body.bookId)
            .then((book) => {
                cart.itens.push({id: book._id, quantity: req.body.quantity})
                cart.total += book.price * req.body.quantity
                
                cart.save((err) => {
                    if(err)
                        res.json(err)
                    
                    res.json({
                        message: "Item Added",
                        data: cart
                    })
                })
            })
            .catch((err) => {
                res.json(err)
            })    
    })
}


exports.removeItem = (req, res) => {
    Cart.findById(req.params.cart_id, async(err, cart) => {
        await Book.findById(req.body.bookId)
            .then((book) => {
                var newCart = filterBook(cart,book._id)
                cart.itens = newCart.itens
                cart.total -= book.price * req.body.quantity

                book.inStock += req.body.quantity

                cart.save((err) => {
                    if(err)
                        res.json(err)

                    res.json({
                        message: "Item Updated",
                        data: cart
                    })
                })
            })
            .catch((err) => {
                res.json(err)
            })
            
    })
}

function filterBook(cart, bookId) {
    return cart.itens.id != bookId
}