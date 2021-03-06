const router = require('express').Router()
const bookController = require('../src/controllers/bookController')
const cartController = require('../src/controllers/cartController')



//BOOKS
router.route('/books')
    .get(bookController.index)
    .post(bookController.new)

router.route('/books/:book_id')
    .get(bookController.view)
    .patch(bookController.update)
    .put(bookController.update)
    .delete(bookController.delete)

router.route('/books/searchauthor/:search')
    .get(bookController.searchByAuthor)

router.route('/books/search/:search')
    .get(bookController.search)

//CART
router.route('/cart')
    .post(cartController.new)

//EXPORTS THE API ROUTES
module.exports = router