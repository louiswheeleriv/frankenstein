var mongoose = require('mongoose');

var actorSchema = mongoose.Schema({
	actor_name : String,
	actor_bio : String,
	dirty : boolean,
	deleted : boolean
});

module.exports = mongoose.model('Actor', actorSchema);