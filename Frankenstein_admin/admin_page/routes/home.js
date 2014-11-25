var express = require('express');
var router = express.Router();

// Access the mongoose models for our objects
var Actor = require('../models/actor');
var Crew = require('../models/crew');
var Stage = require('../models/stage');
var Production = require('../models/production');
var Event = require('../models/event');
var Performance = require('../models/event');

// Connect mongoose to the database
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


/* GET for the update actor page */
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
			"actor_dirty" : false,
			"actor_deleted" : false
		}
	);
	console.log("new actor: ");
	console.log(a);

	a.saveActor();

	res.redirect('/home');
})

/* POST for removing an already exisiting actor */
router.post('/remove_actor', function(req, res) {
	var id = req.body._id;
	var name = req.body.actor_name;

	var a = new Actor( 
		{
			"_id" : id,
			"actor_name" : name,
			"actor_dirty" : false,
			"actor_deleted" : false
		}
	);

	console.log("actor to delete: ");
	console.log(a);

	a.markDeleted();

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

	res.redirect('/home');
});

// **********************************************************************

/* GET for the update actor page*/
router.get('/updateCrew', function(req, res) {

	Crew.getCrew(function(response) {
		console.log("response: ");
		console.log(response);
		res.render('updateCrew.jade', 
			{
				title: 'Frankenstein',
				allCrew:JSON.stringify(response)
			}
		);
	})

});

/* POST for updating an already exisiting actor */
router.post('/update_crew', function(req, res) {
	var id = req.body._id;
	var name = req.body.crew_name;
	var bio = req.body.crew_bio;

	var a = new Crew(
		{
			"_id" : id,
			"crew_name" : name,
			"crew_bio" : bio,
			"crew_dirty" : false,
			"crew_deleted" : false
		}
	);

	a.saveCrew();

	res.redirect('/home');
})

/* POST for removing an already exisiting actor */
router.post('/remove_crew', function(req, res) {
	var id = req.body._id;
	var name = req.body.actor_name;

	var a = new Crew( 
		{
			"_id" : id,
			"crew_name" : name,
			"crew_dirty" : false,
			"crew_deleted" : false
		}
	);

	a.markDeleted();

	res.redirect('/home');

});

// Post for adding a new actor
router.post('/add_crew', function(req, res) {
	var name = req.body.crew_name;
	var bio = req.body.crew_bio;

	var a = new Crew(
		{
			"_id" : -1,
			"crew_name" : name,
			"crew_bio" : bio,
			"crew_dirty" : false,
			"crew_deleted" : false
		}
	);

	a.saveCrew();

	res.redirect('/home');
});

// **********************************************************************




module.exports = router;
