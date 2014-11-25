var mongoose = require('mongoose');

var stageSchema = mongoose.Schema({
	_id : int,
	stage_location : String,
	stage_description : String,
	stage_dirty : boolean,
	stage_deleted : boolean
});

module.exports = mongoose.model('Stage', stageSchema);