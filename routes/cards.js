var express = require('express');
var router = express.Router();
const controller = require('../controllers/CardController')
const { authenticateUser } = require('../Middleware/authMiddleware')

router.get('/trending',authenticateUser, controller.PopularCard);

router.post('/', controller.CreateCard);
router.get('/',authenticateUser, controller.FindAllCard);
router.get('/:id', controller.FindIdCard);
router.put('/:id', controller.EditCard);
router.delete('/:id', controller.DeleteCard);


module.exports = router;
