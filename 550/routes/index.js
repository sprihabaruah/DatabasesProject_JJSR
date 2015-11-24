var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello' });
});


/**THIS WAS THE PROBLEM**/

//router.get('/login', function(req, res, next) {
//	  res.render('login',{result:3});
//	});


router.get('/score', function(req, res, next) {
	  res.render('score');
	});

module.exports = router;
