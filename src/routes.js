const router = require('express').Router()

router.get('/', (req, res) =>{
    res.json({
        status: 'Router is working',
        message: 'First test'
    })
})

var bookController = require('../src/controllers/bookController')

router.route('/books')
    .get(bookController.index)
    .post(bookController.new)

router.route('/books/:book_id')
    .get(bookController.view)
    .patch(bookController.update)
    .put(bookController.update)
    .delete(bookController.delete)

//EXPORTS THE API ROUTES
module.exports = router