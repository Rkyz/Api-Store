var express = require('express');
var router = express.Router();
const controller = require('../controllers/InfoController')


router.get('/', controller.Information);
router.post('/create', controller.InformationCreate);
router.put('/edit/:id', controller.InformationEdit);
router.delete('/delete/:id', controller.InformationDelete);


module.exports = router;
