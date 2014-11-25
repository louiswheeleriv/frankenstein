var mongoose = require('mongoose');

var performanceSchema = mongoose.Schema({
	_id : int,
	performance_info : String,
	performance_stage_id : int,
	performance_start_time : Date,
	performance_production_id : int,
	performance_dirty : boolean,
	performance_deleted : boolean
});

module.exports = mongoose.model('Performance', performanceSchema);