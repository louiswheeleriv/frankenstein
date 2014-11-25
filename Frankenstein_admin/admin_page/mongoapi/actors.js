//
// Actor API
//

function save(req, actor){
	var actors = req.db.get('actors');
	actor.dirty = true;

	

	var present = actors.find({"_id" : actor._id}).limit(1).size();

	if(present == 0){
		console.log('NOT FOUND IN DB, INSERT');
	}else if(present == 1){
		console.log('MATCH FOUND IN DB, UPDATE');
	}
	
	actors.update({"_id":actor._id}, actor, {upsert:true});
}

function insert(actors, actor){
	while(1){
		var cursor = actors.find({}, {_id: 1}).sort(_id).limit(1);
		var seq = cursor.hasNext() ? cursor.next()._id + 1 : 1;
		actor._id = seq;

		var results = actors.insert(actor);

		if(results.hasWriteError()){
			if(results.writeError.code == 11000 /* dup key */ )
				continue;
			else
				console.log('*** Unexpected error inserting data: ' + tojson(results));
		}

		break;
	}
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