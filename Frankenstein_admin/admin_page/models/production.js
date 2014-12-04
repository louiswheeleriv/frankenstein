var mongoose = require('mongoose');

var productionSchema = mongoose.Schema({
	postgres_id : Number,
	production_name : String,
	production_info : String,
	production_dirty : Boolean,
	production_deleted : Boolean,
	production_inserting : Boolean
});

// Instance functions

productionSchema.methods.saveProduction = function(){
	var production = this;

	if(this.postgres_id == -1 && this.production_inserting){
		production.production_dirty = true;
		production.save();

		/*
		var numProductions;
		this.model('Production').count({}, function(err, count){
			numProductions = count;
			production._id = numProductions;
			production.save();
		});
		*/

	}else{
		this.model('Production').findByIdAndUpdate(this._id, {
			"postgres_id" : this.postgres_id,
			"production_name" : this.production_name,
			"production_dirty" : this.production_dirty,
			"production_deleted" : this.production_deleted,
			"production_inserting" : false
		}, function(err){
			if(err)
				console.log(err);
		});
	}
}

productionSchema.methods.markDirty = function(){
	this.model('Production').findByIdAndUpdate(this._id, {"production_dirty" : true}, function(err){
		if(err)
			console.log(err);
	});
}

productionSchema.methods.markDeleted = function(){
	this.model('Production').findByIdAndUpdate(this._id, {"production_dirty" : true}, function(err){
		if(err)
			console.log(err);
	});
}

// Static functions

productionSchema.statics.findProductionById = function(id, callback){
	this.model('Production').findById(id, function(productionSelected){
		callback(productionSelected);
	});
}

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

productionSchema.statics.removeAll = function(callback){
	this.find({}).remove()
	if(callback){
		callback;
	}
}

module.exports = mongoose.model('Production', productionSchema);