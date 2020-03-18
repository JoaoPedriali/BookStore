const Cart = require('../models/cartModel')
const Book = require('../models/bookModel')

//Creates a new cart
exports.new = (req,res) => {
    var cart = new Cart()

    cart.itens = req.body.itens
    cart.total = req.body.total

    cart.save(async (err) =>{

        if(err)
            res.send(err)

        for(var i = 0; i<cart.itens.length;i++){
           await Book.findById(cart.itens[i]._id,)
                .then(book => {

                    book.inStock -= cart.itens[i].quantity

                    book.save(err =>{
                        if(err)
                            res.json(err)

                            res.json({
                                message: 'Updated Book',
                                data: book
                            })
                    })
                })
                .catch(err =>{
                    res.json(err)
                })
        }
    })
    
}