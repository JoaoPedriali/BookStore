const Book = require('../models/bookModel')

//gets the list of books
exports.index = (req,res) => {
    Book.get((err, books) => {
        if (err){
            res.json({
                status:'error',
                message:err
            })
        }

        res.json({
            status: 'sucess',
            message: 'Books retrieved sucessfully',
            data: books
        })
    })
}

//handles the creation of a book
exports.new = (req, res) => {
    var book = new Book()
    book.imgUrl = req.body.imgUrl
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
            message: 'New Book Added',
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
            message: 'Book retrieved',
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
                message: 'Book info updated',
                data: book
            })
        })
    })
}

//handles the deletion of a book
exports.delete = (req, res) => {
    Book.deleteOne({_id: req.params.book_id}, (err, book) => {
        if(err)
            res.send(err)

        res.json({
            status: 'Sucess',
            message: 'Book Deleted'
        })
    })
}


//Query for the search of books
exports.search = (req,res) => {
    var search = req.params.search
    Book.find({title:{$regex: search, $options: 'i'} }, (err, books) => {
        if(err)
            res.json(err)

        res.json({
            message: 'Books Retrieved',
            data: books
        })
    })
}


//query for the search by author
exports.searchByAuthor = (req, res) => {
    var search = req.params.search

    Book.find({author: {$regex: search, $options: 'i'}}, (err, books) => {
        if (err)
            res.json(err)

        res.json({
            message: 'Books Retrieved',
            data: books
        })
    })
}