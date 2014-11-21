//
// Stage API
//

function save(req, stage){
	var stages = req.db.get('stages');
	stages.update({"name":stage.name}, stage, {upsert:true});
}

function getStages(req){
	var stages = req.db.get('stages');
	return stages.find({deleted:false});
}

function getDeletedStages(req){
	var stages = req.db.get('stages');
	return stages.find({deleted:true});
}

function markDirty(req, stage){
	var stages = req.db.get('stages');
	stage.dirty = true;
	stages.update({"name":stage.name}, stage);
}

function markDeleted(req, stage){
	var stages = req.db.get('stages');
	stage.deleted = true;
	stages.update({"name":stage.name}, stage);
}

exports.save = save;
exports.getStages = getStages;
exports.getDeletedStages = getDeletedStages;
exports.markDirty = markDirty;
exports.markDeleted = markDeleted;