var express = require('express');
var router = express.Router();

// Access the mongoose models for our objects
var Actor = require('../models/actor');
var Crew = require('../models/crew');
var Stage = require('../models/stage');
var Production = require('../models/production');
var Event = require('../models/event');
var Performance = require('../models/performance');

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
			"postgres_id" : id,
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
			"postgres_id" : id,
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
			"postgres_id" : -1,
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
			"postgres_id" : id,
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
			"postgres_id" : id,
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
			"postgres_id" : -1,
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

/* GET for the update stage page */
router.get('/updateStage', function(req, res) {
	
	Stage.getStages(function(response) {
		console.log("response: ");
		console.log(response);
		res.render('updateStage.jade', 
			{
				title: 'Frankenstein',
				allStages:JSON.stringify(response)
			}
		);
	})
});


/* POST for updating an already exisiting actor */
router.post('/update_stage', function(req, res) {
	var id = req.body._id;
	var location = req.body.stage_location;
	var description = req.body.stage_description;

	var a = new Stage(
		{
			"postgres_id" : id,
			"stage_location" : location,
			"stage_description" : description,
			"stage_dirty" : false,
			"stage_deleted" : false
		}
	);
	console.log("new stage: ");
	console.log(a);

	a.saveStage();

	res.redirect('/home');
})

/* POST for removing an already exisiting actor */
router.post('/remove_stage', function(req, res) {
	var id = req.body._id;
	var location = req.body.actor_name;

	var a = new Stage( 
		{
			"postgres_id" : id,
			"stage_location" : location,
			"stage_dirty" : false,
			"stage_deleted" : false
		}
	);

	console.log("stage to delete: ");
	console.log(a);

	a.markDeleted();

	res.redirect('/home');

});

// Post for adding a new actor
router.post('/add_stage', function(req, res) {
	var location = req.body.stage_location;
	var description = req.body.stage_description;

	var a = new Stage(
		{
			"postgres_id" : -1,
			"stage_location" : location,
			"stage_description" : description,
			"stage_dirty" : false,
			"stage_deleted" : false
		}
	);

	a.saveStage();

	res.redirect('/home');
});

// **********************************************************************

/* GET for the update stage page */
router.get('/updateEvent', function(req, res) {
	
	Event.getEvents(function(response) {
		console.log("response: ");
		console.log(response);
		res.render('updateSigEvent.jade', 
			{
				title: 'Frankenstein',
				allEvents:JSON.stringify(response)
			}
		);
	})
});

/* POST for updating an already exisiting actor */
router.post('/update_event', function(req, res) {
	var id = req.body._id;
	var name = req.body.event_name;

	var a = new Event(
		{
			"postgres_id" : id,
			"event_name" : name,
			"event_dirty" : false,
			"event_deleted" : false
		}
	);
	console.log("new event: ");
	console.log(a);

	a.saveEvent();

	res.redirect('/home');
})

/* POST for removing an already exisiting actor */
router.post('/remove_event', function(req, res) {
	var id = req.body._id;
	var name = req.body.event_name;

	var a = new Event(
		{
			"postgres_id" : id,
			"event_name" : name,
			"event_dirty" : false,
			"event_deleted" : false
		}
	);

	console.log("event to delete: ");
	console.log(a);

	a.markDeleted();

	res.redirect('/home');

});

// Post for adding a new actor
router.post('/add_event', function(req, res) {
	var name = req.body.event_name;

	console.log(name);

	var a = new Event(
		{
			"postgres_id" : -1,
			"event_name" : name,
			"event_dirty" : false,
			"event_deleted" : false
		}
	);

	console.log(a);

	a.saveEvent();

	res.redirect('/home');
});



// **********************************************************************


/* GET for the update stage page */
router.get('/updatePerf', function(req, res) {
	
	Performance.getPerformances(function(response) {
		console.log("response: ");
		console.log(response);
		
		Stage.getStages(function(allStages) {

			res.render('updatePerf.jade', 
			{
				title: 'Frankenstein',
				allPerfs:JSON.stringify(response),
				allStages:JSON.stringify(allStages)
			}
			);
		})

	})

});

/* POST for updating an already exisiting actor */
router.post('/update_perf', function(req, res) {

	console.log(req.body);

	// var id = req.body._id;
	// var info = req.body.performance_info;

	// var a = new Performance(
	// 	{
	// 		"postgres_id" : id,
	// 		"performance_info" : info,
	// 		"performance_dirty" : false,
	// 		"performance_deleted" : false
	// 	}
	// );
	// console.log("new perf: ");
	// console.log(a);

	// a.savePerformance();

	res.redirect('/home');
})

/* POST for removing an already exisiting actor */
router.post('/remove_perf', function(req, res) {
	// var id = req.body._id;
	// var name = req.body.event_name;

	// var a = new Event(
	// 	{
	// 		"postgres_id" : id,
	// 		"event_name" : name,
	// 		"event_dirty" : false,
	// 		"event_deleted" : false
	// 	}
	// );

	// console.log("event to delete: ");
	// console.log(a);

	// a.markDeleted();

	res.redirect('/home');

});

// Post for adding a new actor
router.post('/add_perf', function(req, res) {
	console.log("req body: ");
	console.log(req.body);
	
	var info = req.body.performance_info;
	var stage = req.body.stage_id;
	var time = req.body.performance_start_time;
	//get actors
	//get crew

	var a = new Performance(
		"performance_info" : info,
		"performance_start_time" : time,
		"performance_stage_id" : stage
	);

	// var a = new Event(
	// 	{
	// 		"postgres_id" : -1,
	// 		"event_name" : name,
	// 		"event_dirty" : false,
	// 		"event_deleted" : false
	// 	}
	// );

	// console.log(a);

	// a.saveEvent();

	res.redirect('/home');
});



module.exports = router;
