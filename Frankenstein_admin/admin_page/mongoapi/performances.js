//
// Performance API
//

function save(req, performance){
	var performances = req.db.get('performances');
	performances.update({"name":performance.name}, performance, {upsert:true});
}

function getPerformances(req){
	var performances = req.db.get('performances');
	return performances.find({deleted:false});
}

function getDeletedPerformances(req){
	var performances = req.db.get('performances');
	return performances.find({deleted:true});
}

function markDirty(req, performance){
	var performances = req.db.get('performances');
	performance.dirty = true;
	performances.update({"name":performance.name}, performance);
}

function markDeleted(req, performance){
	var performances = req.db.get('performances');
	performance.deleted = true;
	performances.update({"name":performance.name}, performance);
}

exports.save = save;
exports.getPerformances = getPerformances;
exports.getDeletedPerformances = getDeletedPerformances;
exports.markDirty = markDirty;
exports.markDeleted = markDeleted;