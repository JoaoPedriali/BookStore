const Book = require('../models/bookModel')

//gets the list of books
exports.index = (req,res) => {
    Book.get((err, books) => {
        if (err){
            res.json({
                status:"error",
                message:err
            })
        }

        res.json({
            status: "sucess",
            message: "Books retrieved sucessfully",
            data: books
        })
    })
}

//handles the creation of a book
exports.new = (req, res) => {
    var book = new Book()
    book.title = req.body.title
    book.author = req.body.author
    book.synopsis = req.body.synopsis
    book.price = req.body.price
    book.inStock = req.body.inStock

    //saves the book
    book.save((err) => {
        if (err)
            res.send(err)

        res.json({
            message: "New Book Added",
            data: book
        })
    })
}

//Handles the book information view
exports.view = (req, res) => {
    Book.findById(req.params.book_id, (err, book) =>{
        if(err)
            res.send(err)

        res.json({
            message: "Book retrieved",
            data: book
         })
    })
}


//updates the data in a book
exports.update = (req, res) => {
    Book.findById(req.params.book_id, (err, book) => {
        book.title = req.body.title
        book.author = req.body.author
        book.synopsis = req.body.synopsis
        book.price = req.body.price
        book.inStock = req.body.inStock

        book.save((err) => {
            if(err)
                res.json(err)
            
            res.json({
                message: "Book info updated",
                data: book
            })
        })
    })
}

//handles the deletion of a book
exports.delete = (req, res) => {
    Book.remove({_id: req.params.book_id}, (err, book) => {
        if(err)
            res.send(err)

        res.json({
            status: "Sucess",
            message: "Book Deleted"
        })
    })
}