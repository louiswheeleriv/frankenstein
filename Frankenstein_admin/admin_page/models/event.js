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
			numEvents = count+1;
			event._id = numEvents;
			event.save();
		});
	}else{
		this.model('Event').findByIdAndUpdate(this._id, {
			"event_name" : this.event_name,
			"event_dirty" : this.event_dirty,
			"event_deleted" : this.event_deleted
		}, function(err){
			if(err)
				console.log(err);
		});
	}
}

eventSchema.methods.markDirty = function(){
	this.model('Event').findByIdAndUpdate(this._id, {"event_dirty" : true}, function(err){
		if(err)
			console.log(err);
	});
}

eventSchema.methods.markDeleted = function(){
	this.model('Event').findByIdAndUpdate(this._id, {"event_deleted" : true}, function(err){
		if(err)
			console.log(err);
	});
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