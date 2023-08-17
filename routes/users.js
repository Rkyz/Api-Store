var express = require('express');
var router = express.Router();
const controller = require('../controllers/UserController')
const userController = require('../controllers/UserController')
const { authenticateUser } = require('../Middleware/authMiddleware')

router.get('/', controller.allAcc);
router.post('/register', controller.Register);
router.post('/login', controller.Login);
router.get('/protected', authenticateUser, userController.protectedRoute);
router.get('/usersignin', controller.getUserSignin);
router.get('/edit/:userId', controller.editUser);
router.get('/:userId', controller.getUserById);



module.exports = router;
