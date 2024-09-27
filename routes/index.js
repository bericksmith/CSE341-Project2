const router = require('express').Router();

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('CSE341 - Project 2 is running.');
});

router.use('/users', require('./users'));
router.use('/products', require('./products'));

module.exports = router;