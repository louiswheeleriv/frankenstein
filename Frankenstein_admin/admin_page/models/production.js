var mongoose = require('mongoose');

var productionSchema = mongoose.Schema({
	_id : int,
	production_name : String,
	production_dirty : boolean,
	production_deleted : boolean
});

module.exports = mongoose.model('Production', productionSchema);