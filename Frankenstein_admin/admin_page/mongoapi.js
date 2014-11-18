/*
    MongoDB API

    Functions for interfacing with the mongo database.
*/

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

function getActors(req, res){
    var db = req.db;
    var actorCollection = db.get('actors');
    actorCollection.find({}, {}, function(e, docs){
        res.render('actorlist', {
            "actorlist":docs
        });
    });
}

function insertItem(req, res, json, collection){
    var db = req.db;
    var collection = db.get(collection);
    collection.insert(json);
}

function insertActor(req, res, name, bio){
    var db = req.db;
    var actorCollection = db.get('actors');
    actorCollection.insert({
        "name":name,
        "bio":bio
    }, function(err, doc){
        if(err){
            res.send("There was a problem adding the item to the database.");
        }else{

        }
    });
}

function deleteItem(req, res, key){
    var db = req.db;
    db.remove(key);
}

exports.createCollections = createCollections;
exports.emptyDatabase = emptyDatabase;
exports.getActors = getActors;
exports.insertActor = insertActor;
exports.deleteItem = deleteItem;