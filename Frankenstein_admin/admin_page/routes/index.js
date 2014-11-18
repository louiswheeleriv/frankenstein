var express = require('express');
var router = express.Router();

// Access the functions in mongoapi.js
var mongoapi = require('../mongoapi');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Frankenstein' });
});

/* GET Hello World Page */
router.get('/helloworld', function(req, res) {
	res.render('helloworld', {title: 'Hello, World!', name:'Frankenstein' })
});

/* GET actor list page */
router.get('/actorlist', function(req, res){
	mongoapi.getActors(req, res);
});

/* POST add actor */
router.post('/addactor', function(req, res){
	mongoapi.insertActor(req, res, req.body.name, req.body.bio);
});

module.exports = router;