var pg = require('pg')
var client = new pg.Client({user: 'machira', database: 'machira', password:'machira'})
var performances_table = "api_performance"
var actors_table = "api_actor"
var crew_table = "api_crew"
var perfactor_table = "api_perfactor"
var stages_table = "api_stage"
var perfcrew_table = "api_perfcew"
var significant_events_table = "api_significant_events"
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
    // pull_performances();
    pull_actors(silly);
    // pull_crew();
    // pull_events();
}

function pull_performances(callback){
    // var performance = [];
    var query = client.query("SELECT * FROM "+performances_table)

    query.on('row', function(row) {
        var perf = new Performance({
            'postgres_id' : row.id, 
            'performance_info' : row.performance_info, 
            'performance_start_time' : row.performance_start_time, 
            'perf_actor' : [],
            'performance_production_id' : row.performance_production_id,
            'performance_dirty':false, 
            'performance_deleted':false});

        
        var query2 = client.query("SELECT  * FROM " + perfactor_table + " WHERE performance_id=$1", [row.id]);
        var query3 = client.query("SELECT  * FROM " + perfcrew_table + " WHERE performance_id=$1", [row.id]);
        var query4 = client.query("SELECT  * FROM " + significant_events_table + " WHERE performance_id=$1", [row.id]);
        query2.on('row', function(row){
            row.postgres_id = row.id
            delete row.id
            perf.perf_actor.push(row)
        })

        query2.on('end',function(result){
            perf.savePerformance();
        })

    });

}

function pull_actors(callback){
    // var actors = [];
    var query = client.query("SELECT * FROM "+actors_table)
    console.log('Pulling the stuff')
    
    query.on('row', function(row) {
        var a = new Actor({
            'postgres_id':row.id, 
            'actor_name':row.actor_name, 
            'actor_bio':row.actor_bio, 
            'actor_dirty':false, 
            'actor_deleted':false});
        a.saveActor();
    });

    query.on('err',function(err){
        console.log(err);
    })

    callback()
}

function pull_crew(callback){
    
    var query = client.query("SELECT * FROM "+crew_table)    
    query.on('row', function(row) {
        var a = new Crew({'postgres_id':row.id, 'crew_name':row.crew_name, 'crew_bio':row.crew_bio, 'crew_dirty':false, 'crew_deleted':false});
        a.saveCrew();
    });

    query.on('err',function(err){
        console.log(err);
    })
    callback()
}

function pull_stages(callback){
    var query = client.query("SELECT * FROM "+stages_table)

    query.on('row',function(row){
        var stage = new Stage({
            "postgres_id":row.id,
            "stage_location":row.stage_location,
            "stage_description":stage_description,
            "stage_dirty":false,
            "stage_deleted":false
        })
        stage.saveStage();
    });
    callback()
}

function pull_significant_events(callback){
    var query = client.query("SELECT * FROM "+significant_events_table)
    query.on('row',function(row){
        var evt = new Event({
            "postgres_id":row.id,
            "event_name":row.stage_location,
            "event_dirty":false,
            "event_deleted":false
        })
        evt.saveEvent();
    });
    callback()
}

// all_performances.update = function update_objects(updated, deleted, table){
//     var perf = perf.getdirtyPerformances()
//     var del = perf.getDeletedPerformances()

//     for (var i = perf.length - 1; i >= 0; i--) {
//         client.query('UPDATE table SET (performance_stage_id,performance_info,
//         performance_start_time, performance_production_id) = ($2,$3,$4) WHERE id= $1',
//         perf[i][performance_stage_id,performance_info, performance_start_time, performance_production_id]);

//     };
//     if (deleted.length > 0){
//         client.query('DELETE FROM table WHERE id IN ($1)',del);
//     }
    
// }

// function update_perfactor(updated, deleted){
    
//     for (var i = updated.length - 1; i >= 0; i--) {
//         client.query('UPDATE api_perfactor SET (performance_id, actor_id, appearance_time,role)
//          = ($2,$3,$4,$5) WHERE id = $1',
//         updated[i][id, performance_id, actor_id, appearance_time,role]);

//     };

//     client.query('DELETE FROM api_perfactor WHERE id IN ($1)', deleted);
// }

// function update_perfcrew(updated, deleted){
    
//     for (var i = updated.length - 1; i >= 0; i--) {
//         client.query('UPDATE api_perfcrew SET (performance_id, crew_id, responsibilities)
//          = ($2,$3,$4) WHERE id = $1',
//         updated[i][id, performance_id, actor_id, appearance_time,role]);

//     };

//     client.query('DELETE FROM api_perfactor WHERE id IN ($1)', deleted);
// }


module.exports = pull