var router = require('express').Router();

router.use('/producto/', require('./api/producto'));
router.use('/imagen/', require('./api/imagen'));
router.use('/producto/', require('./api/user'));

module.exports = router;