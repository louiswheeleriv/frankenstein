var mongoose = require('mongoose');

var crewSchema = mongoose.Schema({
	_id : int,
	crew_name : String,
	crew_bio : String,
	crew_dirty : boolean,
	crew_deleted : boolean
});

module.exports = mongoose.model('Crew', crewSchema);