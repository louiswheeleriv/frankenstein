
from api.models import Performance, Stage, Production, Actor, Crew, PerfActor, PerfCrew
from dateutil import parser

## Populates database with custom CSV

Performance.objects.all().delete()
PerfCrew.objects.all().delete()
PerfActor.objects.all().delete()
Production.objects.all().delete()
Crew.objects.all().delete()
Actor.objects.all().delete()
Stage.objects.all().delete()


with open('../makeTables/crew.csv') as crew_file:
    for line in crew_file:
        name, bio = line.split(',')
        crew = Crew(crew_name=name, crew_bio=bio)
        crew.save()

with open('../makeTables/actor.csv') as actor_file:
    for line in actor_file:
        name, bio = line.split(',')
        actor = Actor(actor_name=name, actor_bio=bio)
        actor.save()

with open('../makeTables/stage.csv') as stage_file:
    for line in stage_file:
        name, bio = line.split(',')
        stage = Stage(stage_location=name, stage_description=bio)
        stage.save()

with open('../makeTables/production.csv') as production_file:
    for line in production_file:
        name, info = line.split(',')
        p = Production(production_info=info, production_name=name)
        p.save()


with open('../makeTables/performance.csv') as perf_file:
    for line in perf_file:
        info, stage, time, production = line.split(',')
        p = Performance(performance_info = info,performance_start_time = parser.parse(time))
        # Select a random Stage
        p.performance_stage = Stage.objects.order_by('?')[0]
        # Select a random Stage
        p.performance_production = Production.objects.order_by('?')[0]
        p.save()

with open('../makeTables/perfactor.csv') as perfactr_file:
    for line in perfactr_file:
        perf, actor, appearance_time, role = line.split(',')
        pa = PerfActor(role = role, appearance_time = appearance_time)
        pa.performance = Performance.objects.order_by('?')[0]
        pa.actor = Actor.objects.order_by('?')[0]
        pa.save()

with open('../makeTables/perfcrew.csv') as perfcrew_file:
    for line in perfcrew_file:
        perf, crew, responsibility = line.split(',')
        pc = PerfCrew()
        pc.responsibilities = responsibility
        pc.performance = Performance.objects.order_by('?')[0]
        pc.crew = Crew.objects.order_by('?')[0]
        pc.save()

print Performance.objects.all()
print Production.objects.all()