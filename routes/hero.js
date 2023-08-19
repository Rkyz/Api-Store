var express = require('express');
var router = express.Router();
const controller = require('../controllers/HeroController')


router.get('/', controller.GetJokiList);
router.get('/all', controller.AllDataGame);
router.post('/create', controller.CreateHero);



module.exports = router;
