//
// Crew API
//

function save(req, crew){
	var crewCollection = req.db.get('crew');
	crewCollection.update({"name":crew.name}, crew, {upsert:true});
}

function getCrew(req){
	var crewCollection = req.db.get('crew');
	return crewCollection.find({deleted:false});
}

function getDeletedCrew(req){
	var crewCollection = req.db.get('crew');
	return crewCollection.find({deleted:true});
}

function markDirty(req, crew){
	var crewCollection = req.db.get('crew');
	crew.dirty = true;
	crewCollection.update({"name":crew.name}, crew);
}

function markDeleted(req, crew){
	var crewCollection = req.db.get('crew');
	crew.deleted = true;
	crewCollection.update({"name":crew.name}, crew);
}

exports.save = save;
exports.getCrew = getCrew;
exports.getDeletedCrew = getDeletedCrew;
exports.markDirty = markDirty;
exports.markDeleted = markDeleted;