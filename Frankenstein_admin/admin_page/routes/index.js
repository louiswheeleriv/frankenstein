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


// HERE LOUIS IS WHERE THE POST INFORMATION GOES
router.post('/add_actor', function(req, res) {
	console.log(req.body);
	console.log(req.body.actor_name);
	console.log(req.body.actor_bio);
	res.redirect('/');
})

module.exports = router;
