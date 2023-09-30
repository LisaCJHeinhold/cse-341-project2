const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    //#swagger.tags=['Hello World']
    res.send('Hello World')
});

router.use('/employees', require('./employees'));
router.use('/departments', require('./departments'));

module.exports = router;