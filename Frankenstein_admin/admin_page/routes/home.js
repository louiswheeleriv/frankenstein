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

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
	res.redirect('/');
}

/* GET home page. */
router.get('/home', isLoggedIn, function(req, res) {
	var actorCollection = req.db.get('actors');
	res.render('home.jade', { title: 'Frankenstein' });
});

router.post('/send_to_postgres', isLoggedIn, function(req, res) {
	res.redirect('/logout');
});

// **********************************************************************


/* GET for the update actor page */
router.get('/updateActor', isLoggedIn, function(req, res) {
	
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
router.post('/update_actor', isLoggedIn, function(req, res) {
	var id = req.body._id;
	var name = req.body.actor_name;
	var bio = req.body.actor_bio;
	var postID = req.body.postgres_id;

	var a = new Actor(
		{
			"_id" : id,
			"postgres_id" : postID,
			"actor_name" : name,
			"actor_bio" : bio,
			"actor_dirty" : false,
			"actor_deleted" : false,
			"actor_inserting" : false
		}
	);

	a.saveActor();

	res.redirect('/updateActor');
})

/* POST for removing an already exisiting actor */
router.post('/remove_actor', isLoggedIn, function(req, res) {
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

	a.markDeleted();

	res.redirect('/updateActor');

});

// Post for adding a new actor
router.post('/add_actor', isLoggedIn, function(req, res) {
	var name = req.body.actor_name;
	var bio = req.body.actor_bio;

	var a = new Actor(
		{
			"postgres_id" : -1,
			"actor_name" : name,
			"actor_bio" : bio,
			"actor_dirty" : false,
			"actor_deleted" : false,
			"actor_inserting" : true
		}
	);

	a.saveActor();

	res.redirect('/updateActor');
});

// **********************************************************************

/* GET for the update actor page*/
router.get('/updateCrew', isLoggedIn, function(req, res) {

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
router.post('/update_crew', isLoggedIn, function(req, res) {
	var id = req.body._id;
	var name = req.body.crew_name;
	var bio = req.body.crew_bio;
	var postID = req.body.postgres_id;

	var a = new Crew(
		{
			"_id" : id,
			"postgres_id" : postID,
			"crew_name" : name,
			"crew_bio" : bio,
			"crew_dirty" : false,
			"crew_deleted" : false,
			"crew_inserting" : false
		}
	);

	a.saveCrew();

	res.redirect('/updateCrew');
})

/* POST for removing an already exisiting actor */
router.post('/remove_crew', isLoggedIn, function(req, res) {
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

	res.redirect('/updateCrew');

});

// Post for adding a new actor
router.post('/add_crew', isLoggedIn, function(req, res) {
	var name = req.body.crew_name;
	var bio = req.body.crew_bio;

	var a = new Crew(
		{
			"postgres_id" : -1,
			"crew_name" : name,
			"crew_bio" : bio,
			"crew_dirty" : false,
			"crew_deleted" : false,
			"crew_inserting" : true
		}
	);

	a.saveCrew();

	res.redirect('/updateCrew');
});

// **********************************************************************

/* GET for the update stage page */
router.get('/updateStage', isLoggedIn, function(req, res) {
	
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
router.post('/update_stage', isLoggedIn, function(req, res) {
	var id = req.body._id;
	var location = req.body.stage_location;
	var description = req.body.stage_description;
	var postID = req.body.postgres_id;

	var a = new Stage(
		{
			"_id" : id,
			"postgres_id" : postID,
			"stage_location" : location,
			"stage_description" : description,
			"stage_dirty" : false,
			"stage_deleted" : false,
			"stage_inserting" : false
		}
	);

	a.saveStage();

	res.redirect('/updateStage');
})

/* POST for removing an already exisiting actor */
router.post('/remove_stage', isLoggedIn, function(req, res) {
	var id = req.body._id;
	var location = req.body.actor_name;

	var a = new Stage( 
		{
			"_id" : id,
			"stage_location" : location,
			"stage_dirty" : false,
			"stage_deleted" : false
		}
	);

	a.markDeleted();

	res.redirect('/updateStage');

});

// Post for adding a new actor
router.post('/add_stage', isLoggedIn, function(req, res) {
	var location = req.body.stage_location;
	var description = req.body.stage_description;

	var a = new Stage(
		{
			"postgres_id" : -1,
			"stage_location" : location,
			"stage_description" : description,
			"stage_dirty" : false,
			"stage_deleted" : false,
			"stage_inserting" : true
		}
	);

	a.saveStage();

	res.redirect('/updateStage');
});

// **********************************************************************

/* GET for the update stage page */
router.get('/updateEvent', isLoggedIn, function(req, res) {
	
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
router.post('/update_event', isLoggedIn, function(req, res) {
	var id = req.body._id;
	var name = req.body.event_name;
	var postID = req.body.postgres_id;

	var a = new Event(
		{
			"_id" : id,
			"postgres_id" : postID,
			"event_name" : name,
			"event_dirty" : false,
			"event_deleted" : false,
			"event_inserting" : false
		}
	);

	a.saveEvent();

	res.redirect('/updateEvent');
})

/* POST for removing an already exisiting actor */
router.post('/remove_event', isLoggedIn, function(req, res) {
	var id = req.body._id;
	var name = req.body.event_name;

	var a = new Event(
		{
			"_id" : id,
			"event_name" : name,
			"event_dirty" : false,
			"event_deleted" : false
		}
	);

	a.markDeleted();

	res.redirect('/updateEvent');

});

// Post for adding a new actor
router.post('/add_event', isLoggedIn, function(req, res) {
	var name = req.body.event_name;

	var a = new Event(
		{
			"postgres_id" : -1,
			"event_name" : name,
			"event_dirty" : false,
			"event_deleted" : false,
			"event_inserting" : true
		}
	);

	a.saveEvent();

	res.redirect('/updateEvent');
});



// **********************************************************************


/* GET for the update stage page */
router.get('/updatePerf', isLoggedIn, function(req, res) {
	
	Performance.getPerformances(function(response) {

		Stage.getStages(function(allStages) {

			Actor.getActors(function(allActors) {

				Crew.getCrew(function(allCrew) {
					res.render('updatePerf.jade', 
					{
						title: 'Frankenstein',
						allPerfs:JSON.stringify(response),
						allStages:JSON.stringify(allStages),
						allActors:JSON.stringify(allActors),
						allCrew:JSON.stringify(allCrew)
					}
					);

				})

			})

		})

	})

});

	

/* POST for updating an already exisiting actor */
router.post('/update_perf', isLoggedIn, function(req, res) {
	console.log("req body: ");
	console.log(req.body);

	var info = req.body.performance_info;
	var stage = req.body.stage_id;
	var time = req.body.performance_start_time;
	var actorcount = req.body.actorcount;
	var crewcount = req.body.crewcount;

	//get actors
	var actors = [];

	if(actorcount > 1) {
		for(var i = 0; i < actorcount; i++) {

			var actor = {
				actor_id : req.body.actorId[i],
				actor_role : req.body.actorRole[i],
				actor_appearance_time : req.body.actorTime[i],
				actor_name : req.body.actorName[i]
			};

			actors.push(actor);

		}
	}		
	if(actorcount == 1) {
		var actor = {
			actor_id : req.body.actorId,
			actor_role : req.body.actorRole,
			actor_appearance_time : req.body.actorTime,
			actor_name : req.body.actorName
		};

		actors.push(actor);
	}

	

	//get crew
	var crews = [];

	if(crewcount > 1) {
		for(var i = 0; i < crewcount; i++) {

			var crew = {
				crew_id : req.body.crewId[i],
				crew_responsibility : req.body.crewResp[i],
				crew_name : req.body.crewName[i]
			};

			crews.push(crew);
		}
	} 
	if(crewcount == 1) {
		var crew = {
			crew_id : req.body.crewId,
			crew_responsibility : req.body.crewResp,
			crew_name : req.body.crewName 
		};

		crews.push(crew);
	}

	

	var a = new Performance(
	{
		"performance_info" : info,
		"performance_stage_id" : stage,
		"performance_start_time" : time,
		"performance_deleted" : false,
		"performance_dirty" : false,
		"performance_actors" : actors,
		"performance_crew" : crews
		// "performance_production_id" : 1,
	}
	);

	a.savePerformance();

	res.redirect('/updatePerf');
})

/* POST for removing an already exisiting actor */
router.post('/remove_perf', isLoggedIn, function(req, res) {
	var id = req.body._id;

	console.log(req.body);

	var a = new Performance(
	{
		"_id" : id
	});

	a.markDeleted();

	res.redirect('/updatePerf');

});

// Post for adding a new actor
router.post('/add_perf', isLoggedIn, function(req, res) {
	console.log("req body: ");
	console.log(req.body);
	
	var info = req.body.performance_info;
	var stage = req.body.stage_id;
	var time = req.body.performance_start_time;
	var actorcount = req.body.actorcount;
	var crewcount = req.body.crewcount;

	//get actors
	var actors = [];

	if(actorcount > 1) {
		for(var i = 0; i < actorcount; i++) {

			var actor = {
				actor_id : req.body.actorId[i],
				actor_role : req.body.actorRole[i],
				actor_appearance_time : req.body.actorTime[i],
				actor_name : req.body.actorName[i]
			};

			actors.push(actor);

		}
	}		
	if(actorcount == 1) {
		var actor = {
			actor_id : req.body.actorId,
			actor_role : req.body.actorRole,
			actor_appearance_time : req.body.actorTime,
			actor_name : req.body.actorName
		};

		actors.push(actor);
	}

	

	//get crew
	var crews = [];

	if(crewcount > 1) {
		for(var i = 0; i < crewcount; i++) {

			var crew = {
				crew_id : req.body.crewId[i],
				crew_responsibility : req.body.crewResp[i],
				crew_name : req.body.crewName[i]
			};

			crews.push(crew);
		}
	} 
	if(crewcount == 1) {
		var crew = {
			crew_id : req.body.crewId,
			crew_responsibility : req.body.crewResp,
			crew_name : req.body.crewName 
		};

		crews.push(crew);
	}

	

	var a = new Performance(
	{
		"postgres_id" : -1,
		"performance_info" : info,
		"performance_stage_id" : stage,
		"performance_start_time" : time,
		"performance_deleted" : false,
		"performance_dirty" : false,
		"performance_actors" : actors,
		"performance_crew" : crews
		// "performance_production_id" : 1,
	}
	);

	console.log("new perf: ")
	console.log(a);

	a.savePerformance();

	res.redirect('/updatePerf');
});



module.exports = router;
