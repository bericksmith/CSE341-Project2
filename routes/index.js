const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['General']
    res.send('CSE341 - Project 2 is running.');
});

router.use('/users', require('./users'));
router.use('/products', require('./products'));

module.exports = router;