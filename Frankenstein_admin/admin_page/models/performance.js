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
		this.model('Performance').findByIdAndUpdate(this._id, {
			"performance_info" : this.performance_info,
			"performance_stage_id" : this.performance_stage_id,
			"performance_start_time" : this.performance_start_time,
			"performance_production_id" : this.performance_production_id,
			"performance_dirty" : this.performance_dirty,
			"performance_deleted" : this.performance_deleted
		}, function(err){
			if(err)
				console.log(err);
		});
	}
}

performanceSchema.methods.markDirty = function(){
	this.model('Performance').findByIdAndUpdate(this._id, {"performance_dirty" : true}, function(err){
		if(err)
			console.log(err);
	});
}

performanceSchema.methods.markDeleted = function(){
	this.model('Performance').findByIdAndUpdate(this._id, {"performance_deleted" : true}, function(err){
		if(err)
			console.log(err);
	});
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