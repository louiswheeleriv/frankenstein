var mongoose = require('mongoose');

var actorSchema = mongoose.Schema({
	name : String,
	bio : String,
	dirty : boolean,
	deleted : boolean
});

module.exports = mongoose.model('Actor', actorSchema);