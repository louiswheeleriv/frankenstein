
from api.models import Performance, Stage, Production, Actor, Crew, PerfActor, PerfCrew
from dateutil import parser

## Populates database with custom CSV

with open('../makeTables/crew.csv') as crew:
    for line in crew:
        name, bio = line.split(',')
        crew = Crew(crew_name=name, crew_bio=bio)
        crew.save()

with open('../makeTables/actor.csv') as actor:
    for line in actor:
        name, bio = line.split(',')
        crew = Actor(actor_name=name, actor_bio=bio)
        crew.save()

with open('../makeTables/stage.csv') as stage:
    for line in stage:
        name, bio = line.split(',')
        crew = Stage(stage_location=name, stage_description=bio)
        crew.save()

with open('../makeTables/performance.csv') as perf:
    for line in perf:
        info, stage, time, production = line.split(',')
        p = Performance(performance_info = info,performance_start_time = parser.parse(time))
        p.performance_stage = Stage.objects.get(pk=stage)
        p.performance_production = Production.objects.get(pk=production)
        p.save()

with open('../makeTables/perfactor.csv') as perfactr:
    for line in perfactr:
        perf, actor, appearance_time, role = line.split(',')
        pc = PerfActor(role = role, appearance_time = appearance_time)
        pc.performance = Performance.objects.get(pk=perf)
        pc.actor = Actor.objects.get(pk=actor)
        pc.save()

with open('../makeTables/perfcrew.csv') as perfcrew:
    for line in perfcrew:
        perf, crew, responsibility = line.split(',')
        pc = PerfCrew()
        pc.responsibilities = responsibility
        pc.performance = Performance.objects.get(pk=perf)
        pc.crew = Crew.objects.get(pk=crew)
        pc.save()

print Performance.objects.all()
print Production.objects.all()