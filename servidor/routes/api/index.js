var router = require('express').Router();
console.log('estamos 3');
router.use('/producto/', require('./producto'));




module.exports = router;