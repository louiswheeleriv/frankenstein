//
// Actor API
//

function save(req, actor){
	var actors = req.db.get('actors');
	actor.dirty = true;
	console.log(JSON.stringify(actor));
	actors.update({"_id":actor._id}, actor, {upsert:true});
}

function getActors(req, callback){
	var actors = req.db.get('actors');
	actors.find({deleted:false}, {}, function(err, docs){
		callback(docs);
	});
}

function getDirtyActors(req, callback){
	var actors = req.db.get('actors');
	actors.find({dirty:true}, {}, function(err, docs){
		callback(docs);
	});
}

function getDeletedActors(req, callback){
	var actors = req.db.get('actors');
	actors.find({deleted:true}, {}, function(err, docs){
		callback(docs);
	});
}

function markDirty(req, actor){
	var actors = req.db.get('actors');
	actor.dirty = true;
	actors.update({"_id":actor._id}, actor);
}

function markDeleted(req, actor){
	var actors = req.db.get('actors');
	actor.deleted = true;
	actors.update({"_id":actor._id}, actor);
}

exports.save = save;
exports.getActors = getActors;
exports.getDirtyActors = getDirtyActors;
exports.getDeletedActors = getDeletedActors;
exports.markDirty = markDirty;
exports.markDeleted = markDeleted;