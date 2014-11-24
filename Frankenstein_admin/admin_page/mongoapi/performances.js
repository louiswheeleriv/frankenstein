//
// Performance API
//

function save(req, performance){
	var performances = req.db.get('performances');
	performance.dirty = true;
	performances.update({"_id":performance._id}, performance, {upsert:true});
}

function getPerformances(req, callback){
	var performances = req.db.get('performances');
	performances.find({deleted:false}, {}, function(err, docs){
		callback(docs);
	});
}

function getDirtyPerformances(req, callback){
	var performances = req.db.get('performances');
	performances.find({dirty:true}, {}, function(err, docs){
		callback(docs);
	});
}

function getDeletedPerformances(req, callback){
	var performances = req.db.get('performances');
	performances.find({deleted:true}, {}, function(err, docs){
		callback(docs);
	});
}

function markDirty(req, performance){
	var performances = req.db.get('performances');
	performance.dirty = true;
	performances.update({"_id":performance._id}, performance);
}

function markDeleted(req, performance){
	var performances = req.db.get('performances');
	performance.deleted = true;
	performances.update({"_id":performance._id}, performance);
}

exports.save = save;
exports.getPerformances = getPerformances;
exports.getDirtyPerformances = getDirtyPerformances;
exports.getDeletedPerformances = getDeletedPerformances;
exports.markDirty = markDirty;
exports.markDeleted = markDeleted;