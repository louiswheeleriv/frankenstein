//
// Stage API
//

function save(req, stage){
	var stages = req.db.get('stages');
	stage.dirty = true;
	stages.update({"_id":stage._id}, stage, {upsert:true});
}

function getStages(req, callback){
	var stages = req.db.get('stages');
	stages.find({deleted:false}, {}, function(err, docs){
		callback(docs);
	});
}

function getDirtyStages(req, callback){
	var stages = req.db.get('stages');
	stages.find({dirty:true}, {}, function(err, docs){
		callback(docs);
	});
}

function getDeletedStages(req, callback){
	var stages = req.db.get('stages');
	stages.find({deleted:true}, {}, function(err, docs){
		callback(docs);
	});
}

function markDirty(req, stage){
	var stages = req.db.get('stages');
	stage.dirty = true;
	stages.update({"_id":stage._id}, stage);
}

function markDeleted(req, stage){
	var stages = req.db.get('stages');
	stage.deleted = true;
	stages.update({"_id":stage._id}, stage);
}

exports.save = save;
exports.getStages = getStages;
exports.getDirtyStages = getDirtyStages;
exports.getDeletedStages = getDeletedStages;
exports.markDirty = markDirty;
exports.markDeleted = markDeleted;