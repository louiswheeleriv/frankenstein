var express = require('express');
var router = express.Router();

// Access the functions in mongoapi.js
var actors = require('../mongoapi/actors');

/* GET home page. */
router.get('/home', function(req, res) {
	var actorCollection = req.db.get('actors');
	actorCollection.find({name:"Save Actor"}, {}, function(data){
		console.log('data...');
		console.log(data);
	});

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

router.get('/updateActor', function(req, res) {
	var actor = 
	{
		"name":"Joe Shmoe",
		"bio":"blah blah blah blah blah",
		"dirty":false,
		"deleted":false
	}

	actors.save(req, actor);
	var c = actors.getActors(req);
	console.log(c);
	// res.send(actors.getActors(req));
	res.render('updateActor.jade', { title: 'Frankenstein' });
})

module.exports = router;
