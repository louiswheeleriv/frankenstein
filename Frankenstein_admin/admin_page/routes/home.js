var express = require('express');
var router = express.Router();

// Access the functions in mongoapi.js
var actors = require('../mongoapi/actors');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { title: 'Frankenstein' });
});

// HERE LOUIS IS WHERE THE POST INFORMATION GOES
router.post('/add_actor', function(req, res) {
	var actor = 
	{
		"name":req.body.actor_name,
		"bio":req.body.actor_bio,
		"dirty":false,
		"deleted":false
	}

	actors.save(req, actor);

	res.redirect('/');
})

module.exports = router;
