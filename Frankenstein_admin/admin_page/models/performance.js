var mongoose = require('mongoose');

var performanceSchema = mongoose.Schema({
	_id : Number,
	performance_info : String,
	performance_stage_id : Number,
	performance_start_time : Date,
	performance_production_id : Number,
	performance_dirty : Boolean,
	performance_deleted : Boolean
});

// Instance functions

performanceSchema.methods.savePerformance = function(){
	var performance = this;
	if(this._id == -1){
		var numPerformances;
		this.model('Performance').count({}, function(err, count){
			numPerformances = count;
			performance._id = numPerformances;
			performance.save();
		});
	}else{
		this.save();
	}
}

performanceSchema.methods.markDirty = function(){
	this.performance_dirty = true;
	this.save();
}

performanceSchema.methods.markDeleted = function(){
	this.performance_deleted = true;
	this.save();
}

// Static functions

performanceSchema.statics.getPerformances = function(callback){
	this.find({"performance_deleted" : false}, function(err, performances){
		callback(performances);
	});
}

performanceSchema.statics.getDirtyPerformances = function(callback){
	this.find({"performance_dirty" : true}, function(err, performances){
		callback(performances);
	});
}

performanceSchema.statics.getDeletedPerformances = function(callback){
	this.find({"performance_deleted" : true}, function(err, performances){
		callback(performances);
	});
}

module.exports = mongoose.model('Performance', performanceSchema);