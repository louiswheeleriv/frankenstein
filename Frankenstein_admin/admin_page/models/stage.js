var mongoose = require('mongoose');

var stageSchema = mongoose.Schema({
	postgres_id : Number,
	stage_location : String,
	stage_description : String,
	stage_dirty : Boolean,
	stage_deleted : Boolean,
	stage_inserting : Boolean
});

// Instance functions

stageSchema.methods.saveStage = function(){
	var stage = this;

	if(this.postgres_id == -1 && this.stage_inserting){
		stage.stage_dirty = true;
		stage.save();

		/*
		var numStages;
		this.model('Stage').count({}, function(err, count){
			numStages = count+1;
			stage._id = numStages;
			stage.save();
		});
		*/

	}else{
		this.model('Stage').findByIdAndUpdate(this._id, {
			"postgres_id" : this.postgres_id,
			"stage_location" : this.stage_location,
			"stage_description" : this.stage_description,
			"stage_dirty" : this.stage_dirty,
			"stage_deleted" : this.stage_deleted,
			"stage_inserting" : false
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

stageSchema.statics.findStageById = function(id, callback){
	this.model('Stage').findById(id, function(stageSelected){
		callback(stageSelected);
	});
}

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

stageSchema.statics.removeAll = function(callback){
	this.find({}).remove().exec()
	if(callback){
		callback()
	}
}

module.exports = mongoose.model('Stage', stageSchema);