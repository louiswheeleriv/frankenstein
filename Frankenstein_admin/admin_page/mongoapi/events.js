//
// Plot Event API
//

function save(req, event){
	var events = req.db.get('events');
	event.dirty = true;
	events.update({"_id":event._id}, event, {upsert:true});
}

function getEvents(req, callback){
	var events = req.db.get('events');
	events.find({deleted:false}, {}, function(err, docs){
		callback(docs);
	});
}

function getDirtyEvents(req, callback){
	var events = req.db.get('events');
	events.find({dirty:true}, {}, function(err, docs){
		callback(docs);
	});
}

function getDeletedEvents(req, callback){
	var events = req.db.get('events');
	events.find({deleted:true}, {}, function(err, docs){
		callback(docs);
	});
}

function markDirty(req, event){
	var events = req.db.get('events');
	event.dirty = true;
	events.update({"_id":event._id}, event);
}

function markDeleted(req, event){
	var events = req.db.get('events');
	event.deleted = true;
	events.update({"_id":event._id}, event);
}

exports.save = save;
exports.getEvents = getEvents;
exports.getDirtyEvents = getDirtyEvents;
exports.getDeletedEvents = getDeletedEvents;
exports.markDirty = markDirty;
exports.markDeleted = markDeleted;