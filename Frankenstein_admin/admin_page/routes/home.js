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

	res.render('home.jade', { title: 'Frankenstein' });
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
		"name":"Allen Shmoe",
		"bio":"blah blah blah blah blah",
		"dirty":false,
		"deleted":false
	}

	actors.save(req, actor);

	actors.getActors(req, function(response) {
		console.log(response);
		res.render('updateActor.jade', 
			{
				title: 'Frankenstein',
				allActors:JSON.stringify(response)
			}
		);
	})
});

module.exports = router;
