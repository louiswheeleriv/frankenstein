var mongoose = require('mongoose');

var crewSchema = mongoose.Schema({
	_id : Number,
	crew_name : String,
	crew_bio : String,
	crew_dirty : Boolean,
	crew_deleted : Boolean
});

// Instance functions

crewSchema.methods.saveCrew = function(){
	var crew = this;
	if(this._id == -1){
		var numCrew;
		this.model('Crew').count({}, function(err, count){
			numCrew = count;
			crew._id = numCrew;
			crew.save();
		});
	}else{
		this.save();
	}
}

crewSchema.methods.markDirty = function(){
	this.crew_dirty = true;
	this.save();
}

crewSchema.methods.markDeleted = function(){
	this.crew_deleted = true;
	this.save();
}

// Static functions

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

crewSchema.statics.getDeletedCrew = function(callback){
	this.find({"crew_deleted" : true}, function(err, crew){
		callback(crew);
	});
}

module.exports = mongoose.model('Crew', crewSchema);