var mongoose = require('mongoose');

var crewSchema = mongoose.Schema({
	postgres_id : Number,
	crew_name : String,
	crew_bio : String,
	crew_dirty : Boolean,
	crew_deleted : Boolean,
	crew_inserting : Boolean
});

// Instance functions

crewSchema.methods.saveCrew = function(){
	var crew = this;

	if(this.postgres_id == -1 && this.crew_inserting){
		crew.crew_dirty = true;
		crew.save();

		/*
		var numCrew;
		this.model('Crew').count({}, function(err, count){
			numCrew = count+1;
			crew._id = numCrew;
			crew.save();
		});
		*/

	}else{
		this.model('Crew').findByIdAndUpdate(this._id, {
			"postgres_id" : this.postgres_id,
			"crew_name" : this.crew_name,
			"crew_bio" : this.crew_bio,
			"crew_dirty" : this.crew_dirty,
			"crew_deleted" : this.crew_deleted,
			"crew_inserting" : false
		}, function(err){
			if(err)
				console.log(err);
		});
	}
}

crewSchema.methods.markDirty = function(){
	this.model('Crew').findByIdAndUpdate(this._id, {"crew_dirty" : true}, function(err){
		if(err)
			console.log(err);
	});
}

crewSchema.methods.markDeleted = function(){
	this.model('Crew').findByIdAndUpdate(this._id, {"crew_deleted" : true}, function(err){
		if(err)
			console.log(err);
	});
}

// Static functions

crewSchema.statics.findCrewById = function(id, callback){
	this.model('Crew').findById(id, function(crewSelected){
		callback(crewSelected);
	});
}

crewSchema.statics.getCrew = function(callback){
	this.find({"crew_deleted" : false}, function(err, crew){
		callback(crew);
	});
}

crewSchema.statics.getDirtyCrew = function(callback){
	this.find({"crew_dirty" : true}, function(err, crew){
		callback(crew);
	});
}

crewSchema.statics.removeAll = function(callback){
	this.find({}).remove().exec();
	if(callback){
		callback();
	}
}


crewSchema.statics.getDeletedCrew = function(callback){
	this.find({"crew_deleted" : true}, function(err, crew){
		callback(crew);
	});
}

module.exports = mongoose.model('Crew', crewSchema);