var pg = require('pg')
var client = new pg.Client({user: 'machira', database: 'machira', password:'machira'})
var performances_table = "api_performance"

client.connect(function(err){
    console.log(err);
});

all_performances.update = function update_objects(updated, deleted, table){
    var perf = perf.getdirtyPerformances()
    var del = perf.getDeletedPerformances()

    for (var i = perf.length - 1; i >= 0; i--) {
        client.query('UPDATE table SET (performance_stage_id,performance_info,
        performance_start_time, performance_production_id) = ($2,$3,$4) WHERE id= $1',
        perf[i][performance_stage_id,performance_info, performance_start_time, performance_production_id]);

    };
    if (deleted.length > 0){
        client.query('DELETE FROM table WHERE id IN ($1)',del);
    }
    
}

function update_perfactor(updated, deleted){
    
    for (var i = updated.length - 1; i >= 0; i--) {
        client.query('UPDATE api_perfactor SET (performance_id, actor_id, appearance_time,role)
         = ($2,$3,$4,$5) WHERE id = $1',
        updated[i][id, performance_id, actor_id, appearance_time,role]);

    };

    client.query('DELETE FROM api_perfactor WHERE id IN ($1)', deleted);
}

function update_perfcrew(updated, deleted){
    
    for (var i = updated.length - 1; i >= 0; i--) {
        client.query('UPDATE api_perfcrew SET (performance_id, crew_id, responsibilities)
         = ($2,$3,$4) WHERE id = $1',
        updated[i][id, performance_id, actor_id, appearance_time,role]);

    };

    client.query('DELETE FROM api_perfactor WHERE id IN ($1)', deleted);
}



module.exports = all_performances;