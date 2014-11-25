var mongoose = require('mongoose');

var actorSchema = mongoose.Schema({
	_id : Number,
	actor_name : String,
	actor_bio : String,
	actor_dirty : Boolean,
	actor_deleted : Boolean
});

// Instance functions

actorSchema.methods.saveActor = function(){
	var actor = this;
	if(this._id == -1){
		var numActors;
		this.model('Actor').count({}, function(err, count){
			numActors = count;
			actor._id = numActors;
			actor.save();
		});
	}else{
		console.log(actor);
		this.model('Actor').findByIdAndUpdate(this._id, {
			"actor_name" : this.actor_name,
			"actor_bio" : this.actor_bio,
			"actor_dirty" : this.actor_dirty,
			"actor_deleted" : this.actor_deleted
		}, function(err){
			if(err)
				console.log(err);
		});
	}
}

actorSchema.methods.markDirty = function(){
	this.model('Actor').findByIdAndUpdate(this._id, {"actor_dirty" : true}, function(err){
		if(err)
			console.log(err);
	});
}

actorSchema.methods.markDeleted = function(){
	this.model('Actor').findByIdAndUpdate(this._id, {"actor_deleted" : true}, function(err){
		if(err)
			console.log(err);
	});
}

// Static functions

actorSchema.statics.getActors = function(callback){
	this.find({"actor_deleted" : false}, function(err, actors){
		callback(actors);
	});
}

actorSchema.statics.getDirtyActors = function(callback){
	this.find({"actor_dirty" : true}, function(err, actors){
		callback(actors);
	});
}

actorSchema.statics.getDeletedActors = function(callback){
	this.find({"actor_deleted" : true}, function(err, actors){
		callback(actors);
	});
}

module.exports = mongoose.model('Actor', actorSchema);