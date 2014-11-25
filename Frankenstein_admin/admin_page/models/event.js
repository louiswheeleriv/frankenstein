var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
	_id : Number,
	event_name : String,
	event_dirty : Boolean,
	event_deleted : Boolean
});

// Instance functions

eventSchema.methods.saveEvent = function(){
	var event = this;
	if(this._id == -1){
		var numEvents;
		this.model('Event').count({}, function(err, count){
			numEvents = count;
			event._id = numEvents;
			event.save();
		});
	}else{
		this.save();
	}
}

eventSchema.methods.markDirty = function(){
	this.event_dirty = true;
	this.save();
}

eventSchema.methods.markDeleted = function(){
	this.event_deleted = true;
	this.save();
}

// Static functions

eventSchema.statics.getEvents = function(callback){
	this.find({"event_deleted" : false}, function(err, events){
		callback(events);
	});
}

eventSchema.statics.getDirtyEvents = function(callback){
	this.find({"event_dirty" : true}, function(err, events){
		callback(events);
	});
}

eventSchema.statics.getDeletedEvents = function(callback){
	this.find({"event_deleted" : true}, function(err, events){
		callback(events);
	});
}

module.exports = mongoose.model('Event', eventSchema);