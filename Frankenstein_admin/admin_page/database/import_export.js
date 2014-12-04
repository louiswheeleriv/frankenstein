var pg = require('pg')
var client = new pg.Client({user: 'machira', database: 'machira', password:'machira'})
var performances_table = "api_performance"
var actors_table = "api_actor"
var crew_table = "api_crew"
var perfactor_table = "api_perfactor"
var stages_table = "api_stage"
var perfcrew_table = "api_perfcrew"
var production_table = "api_production"
var significant_events_table = "api_significantevent"
var Actor = require('../models/actor');
var Crew = require('../models/crew');
var Stage = require('../models/stage');
var Production = require('../models/production');
var Event = require('../models/event');
var Performance = require('../models/event');

client.connect(function(err){
    console.log(err);
});
function silly () {
    1+1    
}
var pull = function(){
    console.log('Pulling the stuff')
    pull_actors(pull_crew(pull_significant_events(pull_stages(pull_production(pull_performances)))));
}

function removeall(){
    Actor.removeAll();
    Stage.removeAll();
    Event.removeAll();
    Performance.removeAll();
}
var push_all = function(){
    push_actors()
    push_stages()
    push_events()    
}

function pull_performances(callback){
    // var performance = [];
    var query = client.query("SELECT * FROM " + performances_table)

    query.on('row', function(row) {
        var perf = new Performance({
            'postgres_id' : row.p_id, 
            'performance_info' : row.performance_info, 
            'performance_start_time' : row.performance_start_time,
            'performance_dirty':false, 
            'performance_deleted':false});

        var production = Production.findOne({"postgres_id":row.production_id})
        perf.performance_production_id = production._id

        var query2 = client.query("SELECT  * FROM " + perfactor_table + " WHERE performance_id=$1", [row.id]);
        var query3 = client.query("SELECT  * FROM " + perfcrew_table + " WHERE performance_id=$1", [row.id]);
        var query4 = client.query("SELECT  * FROM " + significant_events_table + " WHERE performance_id=$1", [row.id]);
        
        query2.on('row', function(row){
            var perfactor = {
                'actor_role' : row.role,
                'actor_appearance_time' : row.appearance_time
            }
            Actor.findOne({"postgres_id":row.actor_id},function(err,actor){
                if(err){
                    console.log(err)
                }else{
                    perfactor.actor_id = actor._id
                    perf.performance_actors.push(perfactor)
                } 
            })
        })
        query2.on('end',function(err,result){
            if(err){
                console.log(err)
            }else{
                perf.save()
            }
        })
        query3.on('row', function(row){    
            var perfcrew = {
                'crew_responsibility' : row.responsibilities,
            }
            Crew.findOne({"postgres_id":row.crew_id},function(err,crew){
                if(err){
                    console.log(err)
                }else{
                    perfactor.crew_id = crew._id
                    perf.performance_crew.push(perfcrew)
                } 
            })
        })

        query3.on('end',function(err,result){
            if(err){
                console.log(err)
            }else{
                perf.save()
            }
        })

        query4.on('row',function(row){
            Event.findOne({"postgres_id":row.id}, function(err, s_event){
                if(err){
                    console.log(err)
                }else{
                    perf.performance_events.push(s_event._id)
                }
            })
        })

        query4.on('end',function(err,result){
            if(err){
                console.log(err)
            }else{
                perf.save()
            }
       });
    })
    if(callback){  
        callback()
    }
}

function pull_actors(callback){
    // var actors = [];
    var query = client.query("SELECT * FROM "+actors_table)
    
    query.on('row', function(row) {
        var a = new Actor({
            'postgres_id':row.id, 
            'actor_name':row.actor_name, 
            'actor_bio':row.actor_bio, 
            'actor_dirty':false, 
            'actor_deleted':false});
        a.save();
    });

    query.on('err',function(err){
        console.log(err);
    })

    if(callback){
        callback()
    }
}

function pull_production(callback){
    var query = client.query("SELECT * FROM "+production_table)

    query.on('row',function(row){
        
        var production = new Production({
            "postgres_id":row.id,
            "production_info":row.production_info,
            "production_name":row.production_name,
            "production_dirty":false,
            "production_deleted":false
        })
        production.save();
    });

    query.on('end',function (err,result) {
        if(err){
            console.log(err)
        }
        if(callback){
            callback()
        }   
    })
}
function pull_crew(callback){
    
    var query = client.query("SELECT * FROM "+crew_table)    
    query.on('row', function(row) {
        var a = new Crew({'postgres_id':row.id, 'crew_name':row.crew_name, 'crew_bio':row.crew_bio, 'crew_dirty':false, 'crew_deleted':false});
        a.save();
    });

    query.on('err',function(err){
        console.log(err);
    })
    
    query.on('end',function (err,result) {
        if(err){
            console.log(err)
        }
        if(callback){
            callback()
        }   
    })

}

function pull_stages(callback){
    var query = client.query("SELECT * FROM "+stages_table)

    query.on('row',function(row){
        var stage = new Stage({
            "postgres_id":row.id,
            "stage_location":row.stage_location,
            "stage_description":row.stage_description,
            "stage_dirty":false,
            "stage_deleted":false
        })
        stage.save();
    });
    if(callback){
        callback()
    }
}

function pull_significant_events(callback){
    var query = client.query("SELECT * FROM "+significant_events_table)
    query.on('row',function(row){
        var evt = new Event({
            "postgres_id":row.id,
            "event_name":row.description,
            "event_dirty":false,
            "event_deleted":false
        })
        evt.save();
    });
    if(callback){
        callback()
    }
}

function push_actors(){
    Actor.getDirtyActors(function(dirtyActors){
        for (var i = dirtyActors.length - 1; i >= 0; i--) {
            var actor = dirtyActors[i]
            if (actor.postgres_id > 0){
                client.query("UPDATE "+actors_table+" SET (actor_name,actor_bio) = ($2,$3) WHERE id=$1",[actor.postgres_id,actor.actor_name,actor.actor_bio],function(err,result){
                    if(err){
                        console.log(err)
                    }
                })
            }
            else{
                client.query("INSERT INTO "+actors_table+" (actor_name,actor_bio) VALUES ($1,$2)",[actor.actor_name,actor.actor_bio],function(err,result){
                    if(err){
                        console.log(err)
                    }
                })
            }
        };
    });
}

function push_crew(){
    Crew.getDirtyCrew(function(dirtyCrew){
        for (var i = dirtyActors.length - 1; i >= 0; i--) {
            var crew = dirtyCrew[i]
            if (crew.postgres_id > 0){
                client.query("UPDATE "+crew_table+" SET (crew_name,crew_bio) = ($2,$3) WHERE id = $1",[crew.postgres_id,crew.crew_name,crew.crew_bio])
            }
            else{
                client.query("INSERT INTO "+crew_table+" (crew_name,crew_bio) VALUES ($2,$3)",[crew.crew_name,crew.crew_bio])
            }
        };
    });
}

function push_events(){
    Event.getDirtyEvents(function(dirtyEvents){
        for (var i = dirtyEvents.length - 1; i >= 0; i--) {
            var evt = dirtyEvents[i]
            if (evt.postgres_id > 0){
                client.query("UPDATE "+significant_events_table+" SET (description) = ($2) WHERE id = $1",[evt.postgres_id,evt.description])
            }
            else{
                client.query("INSERT INTO "+significant_events_table+" (description) VALUES ($1)",[evt.event_name])
            }
        };
    });
}

function push_stages(){
    Stage.getDirtyStages(function(dirtyStages){
        for (var i = dirtyStages.length - 1; i >= 0; i--) {
            var stage = dirtyStages[i]
            if (stage.postgres_id > 0){
                client.query("UPDATE "+stages_table+" SET (stage_location,stage_description) = ($2,$3) WHERE id = $1",[stage.postgres_id,stage.stage_location,stage.stage_description])
            }
            else{
                client.query("INSERT INTO "+stages_table+" (stage_location,stage_description) VALUES ($1,$2)",[stage.stage_location,stage.stage_description])
            }
        };
    });
}

function push_performances(){
    Performance.getDirtyPerformances(function(dirtyPerformances){

    })
}
var import_export = {};
import_export.pull = pull
import_export.push_all = push_all
module.exports = import_export