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

// **********************************************************************


/* GET for the update actor page*/
router.get('/updateActor', function(req, res) {
	
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

/* POST for updating an already exisiting actor */
router.post('/update_actor', function(req, res) {
	var actor = 
	{
		"name":req.body.actor_name,
		"bio":req.body.actor_bio,
		// "dirty":false,
		// "deleted":false
	}

	actors.save(req, actor);

	console.log("New actors: ");
	actors.getActors(req, function(response) {
		console.log("***************************************************");
		console.log(response);
	})

	res.redirect('/updateActor');
})

/* POST for removing an already exisiting actor */
router.post('/remove_actor', function(req, res) {
	var actor = 
	{
		"name":req.body.actor_name,
		"bio":req.body.actor_bio,
		// "dirty":false,
		// "deleted":false
	}

	// remove the actor, what should be given to be deleted????
	console.log("removed " + actor.name);

	res.redirect('/updateActor');

})

// Post for adding a new actor
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

// **********************************************************************

/* GET for the update actor page*/
router.get('/updateCrew', function(req, res) {

	// actors.getActors(req, function(response) {
	// 	console.log(response);
	// 	res.render('updateActor.jade', 
	// 		{
	// 			title: 'Frankenstein',
	// 			allActors:JSON.stringify(response)
	// 		}
	// 	);
	// })

	res.render('updateCrew.jade', {title: 'Frankenstein'});
});



module.exports = router;
