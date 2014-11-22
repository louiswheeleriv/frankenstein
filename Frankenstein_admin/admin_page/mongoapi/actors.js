//
// Actor API
//

function save(req, actor){
	var actors = req.db.get('actors');
	actors.update({"name":actor.name}, actor, {upsert:true});
}

function getActors(req){
	var actors = req.db.get('actors');
	// console.log(actors);
	return actors.find({deleted:false});
}

function getDeletedActors(req){
	var actors = req.db.get('actors');
	return actors.find({deleted:true});
}

function markDirty(req, actor){
	var actors = req.db.get('actors');
	actor.dirty = true;
	actors.update({"name":actor.name}, actor);
}

function markDeleted(req, actor){
	var actors = req.db.get('actors');
	actor.deleted = true;
	actors.update({"name":actor.name}, actor);
}

exports.save = save;
exports.getActors = getActors;
exports.getDeletedActors = getDeletedActors;
exports.markDirty = markDirty;
exports.markDeleted = markDeleted;