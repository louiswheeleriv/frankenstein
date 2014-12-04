var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;

var performanceSchema = mongoose.Schema({
	postgres_id : Number,
	performance_info : String,
	performance_stage_id : ObjectId,
	performance_start_time : Date,
	performance_production_id : ObjectId,

	performance_actors : [{
		actor_id : ObjectId,
		actor_role : String,
		actor_appearance_time : Number
	}],

	performance_crew : [{
		crew_id : ObjectId,
		crew_responsibility : String
	}],

	performance_events : [{
		event_id : ObjectId
	}],

	performance_dirty : Boolean,
	performance_deleted : Boolean
});

// Instance functions

performanceSchema.methods.savePerformance = function(){
	var performance = this;

	if(this.postgres_id == -1){
		console.log("this is here");
		performance.performance_dirty = true;
		performance.save();

		/*
		var numPerformances;
		this.model('Performance').count({}, function(err, count){
			numPerformances = count;
			performance._id = numPerformances;
			performance.save();
		});
		*/

	}else{
		this.model('Performance').findByIdAndUpdate(this._id, {
			"postgres_id" : this.postgres_id,
			"performance_info" : this.performance_info,
			"performance_stage_id" : this.performance_stage_id,
			"performance_start_time" : this.performance_start_time,
			"performance_production_id" : this.performance_production_id,
			"performance_actors" : this.performance_actors,
			"performance_crew" : this.performance_crew,
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

performanceSchema.statics.findPerformanceById = function(id, callback){
	this.model('Performance').findById(id, function(performanceSelected){
		callback(performanceSelected);
	});
}

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