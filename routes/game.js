var express = require('express');
var router = express.Router();
const controller = require('../controllers/GameController')
const {authenticateUser} = require('../Middleware/authMiddleware')


router.get('/', controller.AllDataGame);
router.get('/:id', controller.IdDataGame);
router.post('/create', controller.CreateGame);
router.put('/edit/:id', controller.UpdateGame);


module.exports = router;
