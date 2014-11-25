var express = require('express');
var router = express.Router();

// Access the functions in mongoapi.js
var actors = require('../mongoapi/actors');
var Actor = require('../models/actor');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/admindb', function(err){
	if(err)
		console.log('*** Connection error: ' + err);
	else
		console.log('*** Mongoose connected successfully');
});

/* GET home page. */
router.get('/home', function(req, res) {
	var actorCollection = req.db.get('actors');
	res.render('home.jade', { title: 'Frankenstein' });
});

// **********************************************************************


/* GET for the update actor page*/
router.get('/updateActor', function(req, res) {
	
	Actor.getActors(function(response) {
		console.log("response: ");
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
	var id = req.body._id;
	var name = req.body.actor_name;
	var bio = req.body.actor_bio;

	var a = new Actor(
		{
			"_id" : id,
			"actor_name" : name,
			"actor_bio" : bio,
			"dirty" : false,
			"deleted" : false
		}
	);

	a.save(function(err){
		if(err)
			console.log(err);
	});

	/*
	actors.save(req, a);

	actors.getActors(req, function(response) {
		console.log("New actors: ");
		console.log("***************************************************");
		console.log(response);
	})
	*/


	res.redirect('/home');
})

/* POST for removing an already exisiting actor */
router.post('/remove_actor', function(req, res) {

	var actor = 
	{
		"_id":req.body._id,
		"name":req.body.actor_name
	}

	console.log(actor);

	actors.markDeleted(req, actor);

	// remove the actor, what should be given to be deleted????
	console.log("removed " + actor.name);
	console.log("id: " + actor._id);

	res.redirect('/home');

});

// Post for adding a new actor
router.post('/add_actor', function(req, res) {
	var name = req.body.actor_name;
	var bio = req.body.actor_bio;

	var a = new Actor(
		{
			"_id" : -1,
			"actor_name" : name,
			"actor_bio" : bio,
			"actor_dirty" : false,
			"actor_deleted" : false
		}
	);

	a.saveActor();

	//actors.save(req, actor);

	res.redirect('/home');
});

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
