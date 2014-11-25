var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
	_id : int,
	event_name : String,
	event_dirty : boolean,
	event_deleted : boolean
});

module.exports = mongoose.model('Event', eventSchema);