//
// Crew API
//

function save(req, crew){
	var crews = req.db.get('crew');
	crew.dirty = true;
	crews.update({"_id":crew._id}, crew, {upsert:true});
}

function getCrew(req, callback){
	var crews = req.db.get('crew');
	crews.find({deleted:false}, {}, function(err, docs){
		callback(docs);
	});
}

function getDirtyCrew(req, callback){
	var crews = req.db.get('crew');
	crews.find({dirty:true}, {}, function(err, docs){
		callback(docs);
	});
}

function getDeletedCrew(req, callback){
	var crews = req.db.get('crew');
	crews.find({deleted:true}, {}, function(err, docs){
		callback(docs);
	});
}

function markDirty(req, crew){
	var crews = req.db.get('crew');
	crew.dirty = true;
	crews.update({"_id":crew._id}, crew);
}

function markDeleted(req, crew){
	var crews = req.db.get('crew');
	crew.deleted = true;
	crews.update({"_id":crew._id}, crew);
}

exports.save = save;
exports.getCrew = getCrew;
exports.getDirtyCrew = getDirtyCrew;
exports.getDeletedCrew = getDeletedCrew;
exports.markDirty = markDirty;
exports.markDeleted = markDeleted;