var mongoose = require('mongoose');

var actorSchema = mongoose.Schema({
	_id : Number,
	actor_name : String,
	actor_bio : String,
	actor_dirty : Boolean,
	actor_deleted : Boolean
});

// Instance functions

var Actor = mongoose.model('Actor', actorSchema);

actorSchema.methods.saveActor = function(){
	if(this._id == -1){
		var numActors = Actor.find({}).size();
		this._id = numActors;
	}
	this.save();
}

actorSchema.methods.markDirty = function(){
	this.actor_dirty = true;
	this.save();
}

actorSchema.methods.markDeleted = function(){
	this.actor_deleted = true;
	this.save();
}

// Static functions

actorSchema.statics.getActors = function(callback){
	return this.find({"actor_deleted" : false}, callback);
}

actorSchema.statics.getDirtyActors = function(callback){
	return this.find({"actor_dirty" : true}, callback);
}

actorSchema.statics.getDeletedActors = function(callback){
	return this.find({"actor_deleted" : true}, callback);
}

module.exports = mongoose.model('Actor', actorSchema);