var mongoose = require('mongoose');

var productionSchema = mongoose.Schema({
	_id : Number,
	production_name : String,
	production_dirty : Boolean,
	production_deleted : Boolean
});

// Instance functions

productionSchema.methods.saveProduction = function(){
	var production = this;
	if(this._id == -1){
		var numProductions;
		this.model('Production').count({}, function(err, count){
			numProductions = count;
			production._id = numProductions;
			production.save();
		});
	}else{
		this.save();
	}
}

productionSchema.methods.markDirty = function(){
	this.production_dirty = true;
	this.save();
}

productionSchema.methods.markDeleted = function(){
	this.production_deleted = true;
	this.save();
}

// Static functions

productionSchema.statics.getProductions = function(callback){
	this.find({"production_deleted" : false}, function(err, productions){
		callback(productions);
	});
}

productionSchema.statics.getDirtyProductions = function(callback){
	this.find({"production_dirty" : true}, function(err, productions){
		callback(productions);
	});
}

productionSchema.statics.getDeletedProductions = function(callback){
	this.find({"production_deleted" : true}, function(err, productions){
		callback(productions);
	});
}

module.exports = mongoose.model('Production', productionSchema);