
from api.models import Performance, Stage, Production, Actor, Crew, PerfActor, PerfCrew, SignificantEvent
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
        # Part 3 of Act 1,Mohican Media Room 2,5/22/2015,19:25,Frankenstein
        info, stage_name, date, time, production = line.split(',')
        p = Performance(performance_info = info,performance_start_time = parser.parse(date+' '+time))
        # Select a random Stage
        stage = Stage.objects.filter(stage_location = stage_name).get()
        p.performance_stage = stage
        # Select a random Stage
        p.performance_production = Production.objects.order_by('?')[0]
        p.save()

with open('../makeTables/perfactor.csv') as perfactr_file:
    for line in perfactr_file:
        # Part 4 of Act 1,Ellen Galperin,The Monster,19:45
        perf, actor, role, appearance_time = line.split(',')
        appearance_time = appearance_time.split(':')[1]
        pa = PerfActor(role = role, appearance_time = appearance_time)
        performance = Performance.objects.filter(performance_info = perf).order_by('?')[0]
        pa.performance = performance
        pa.actor = Actor.objects.filter(actor_name=actor).get()
        pa.save()

with open('../makeTables/perfcrew.csv') as perfcrew_file:
    for line in perfcrew_file:
        perf, crew, responsibility = line.split(',')
        pc = PerfCrew()
        pc.responsibilities = responsibility
        pc.performance = Performance.objects.filter(performance_info = perf).order_by('?')[0]
        pc.crew = Crew.objects.filter(crew_name=crew).get()
        pc.save()

with open('../makeTables/significant_event.csv') as sigevent:
    for line in sigevent:
        perf, event = line.split(',')
        sig_event = SignificantEvent()
        sig_event.description = event
        sig_event.performance = Performance.objects.filter(performance_info = perf).order_by('?')[0]
        sig_event.save()
