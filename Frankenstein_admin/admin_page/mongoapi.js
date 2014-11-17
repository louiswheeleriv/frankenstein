/*
    MongoDB API

    Functions for interfacing with the mongo database.
*/

// Database functions

function createCollections(req, res){
    var db = req.db;
    db.createCollection("performances");
    db.createCollection("stages");
    db.createCollection("actors");
    db.createCollection("crew");
}

function emptyDatabase(req, res){
    var db = req.db;
    var performanceCollection = db.get('performances');
    var stageCollection = db.get('stages');
    var actorCollection = db.get('actors');
    var crewCollection = db.get('crew');

    performanceCollection.drop();
    stageCollection.drop();
    actorCollection.drop();
    crewCollection.drop();
}

// Performance functions

function getItems(req, res) {

}

function insertItem(req, res, json, collection){
    var db = req.db;
    var collection = db.get(collection);
    collection.insert(json);
}

function updateItem(req, res){

}

function deleteItem(req, res){

}

exports.getItems = getItems;
exports.insertItem = insertItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;