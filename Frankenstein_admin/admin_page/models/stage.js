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
		this.save();
	}
}

stageSchema.methods.markDirty = function(){
	this.stage_dirty = true;
	this.save();
}

stageSchema.methods.markDeleted = function(){
	this.stage_deleted = true;
	this.save();
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