var mongoose = require('mongoose');

var actorSchema = mongoose.Schema({
	postgres_id : Number,
	actor_name : String,
	actor_bio : String,
	actor_dirty : Boolean,
	actor_deleted : Boolean,
	actor_inserting : Boolean
});

// Instance functions

actorSchema.methods.saveActor = function(){
	var actor = this;

	if(this.postgres_id == -1 && this.actor_inserting){
		actor.actor_dirty = true;
		actor.save();

		/*		
		var numActors;
		this.model('Actor').count({}, function(err, count){
			numActors = count+1;
			actor._id = numActors;
			actor.save();
		});
		*/

	}else{
		this.model('Actor').findByIdAndUpdate(this._id, {
			"postgres_id" : this.postgres_id,
			"actor_name" : this.actor_name,
			"actor_bio" : this.actor_bio,
			"actor_dirty" : this.actor_dirty,
			"actor_deleted" : this.actor_deleted,
			"actor_inserting" : false
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

actorSchema.statics.findActorById = function(id, callback){
	this.model('Actor').findById(id, function(actorSelected){
		callback(actorSelected);
	});
}

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

actorSchema.statics.removeAll = function(callback){
	this.find({}).remove().exec();
	if (callback){
		callback()
	}
}

module.exports = mongoose.model('Actor', actorSchema);