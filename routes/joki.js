var express = require('express');
var router = express.Router();
const controller = require('../controllers/JokiController')


router.get('/', controller.GetJokiList);
router.post('/create', controller.CreateJoki);
router.put('/:id', controller.UpdateJoki);
router.get('/:id', controller.GetJokiById);


module.exports = router;
