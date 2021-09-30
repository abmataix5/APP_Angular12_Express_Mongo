var router = require('express').Router();

router.use('/producto/', require('./api/producto'));
router.use('/imagen/', require('./api/imagen'));

module.exports = router;