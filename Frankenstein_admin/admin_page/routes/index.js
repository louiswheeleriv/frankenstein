var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Frankenstein' });
});

/* GET Hello World Page */
router.get('/helloworld', function(req, res) {
	res.render('helloworld', {title: 'Hello, World!', name:'Frankenstein' })
});

module.exports = router;
