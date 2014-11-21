//
// Plot Event API
//

function save(req, plotEvent){
	var plotEvents = req.db.get('plotEvents');
	plotEvents.update({"name":plotEvent.name}, plotEvent, {upsert:true});
}

function getPlotEvents(req){
	var plotEvents = req.db.get('plotEvents');
	return plotEvents.find({deleted:false});
}

function getDeletedPlotEvents(req){
	var plotEvents = req.db.get('plotEvents');
	return plotEvents.find({deleted:true});
}

function markDirty(req, plotEvent){
	var plotEvents = req.db.get('plotEvents');
	plotEvent.dirty = true;
	plotEvents.update({"name":plotEvent.name}, plotEvent);
}

function markDeleted(req, plotEvent){
	var plotEvents = req.db.get('plotEvents');
	plotEvent.deleted = true;
	plotEvents.update({"name":plotEvent.name}, plotEvent);
}

exports.save = save;
exports.getPlotEvents = getPlotEvents;
exports.getDeletedPlotEvents = getDeletedPlotEvents;
exports.markDirty = markDirty;
exports.markDeleted = markDeleted;