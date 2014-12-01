var mongoose = require('mongoose');

var stageSchema = mongoose.Schema({
	_id : Number,
	stage_location : String,
	stage_description : String,
	stage_dirty : Boolean,
	stage_deleted : Boolean
});

// Instance functions

stageSchema.methods.saveStage = function(){
	var stage = this;
	if(this._id == -1){
		var numStages;
		this.model('Stage').count({}, function(err, count){
			numStages = count;
			stage._id = numStages;
			stage.save();
		});
	}else{
		this.model('Stage').findByIdAndUpdate(this._id, {
			"stage_location" : this.stage_location,
			"stage_description" : this.stage_description,
			"stage_dirty" : this.stage_dirty,
			"stage_deleted" : this.stage_deleted
		}, function(err){
			if(err)
				console.log(err);
		});
	}
}

stageSchema.methods.markDirty = function(){
	this.model('Stage').findByIdAndUpdate(this._id, {"stage_dirty" : true}, function(err){
		if(err)
			console.log(err);
	});
}

stageSchema.methods.markDeleted = function(){
	this.model('Stage').findByIdAndUpdate(this._id, {"stage_deleted" : true}, function(err){
		if(err)
			console.log(err);
	});
}

// Static functions

stageSchema.statics.getStages = function(callback){
	this.find({"stage_deleted" : false}, function(err, stages){
		callback(stages);
	});
}

stageSchema.statics.getDirtyStages = function(callback){
	this.find({"stage_dirty" : true}, function(err, stages){
		callback(stages);
	});
}

stageSchema.statics.getDeletedStages = function(callback){
	this.find({"stage_deleted" : true}, function(err, stages){
		callback(stages);
	});
}

module.exports = mongoose.model('Stage', stageSchema);