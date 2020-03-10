const router = require('express').Router()

router.get('/', (req, res) =>{
    res.json({
        status: 'Router is working',
        message: 'First test'
    })
})


//EXPORTS THE API ROUTERS
module.exports = router