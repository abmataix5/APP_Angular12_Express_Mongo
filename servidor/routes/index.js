var router = require('express').Router();

router.use('/producto/', require('./api/producto'));

module.exports = router;