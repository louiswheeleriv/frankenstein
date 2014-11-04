from datetime import timedelta
import json

from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from dateutil.parser import  parse

from api.frankenstein_serialization import PerformanceSerializer
from api.models import Stage, Actor, Crew, Performance, SignificantEvent


def index(request):
    return render(request, 'frankenstein_mobile/index.html')

###########################################################################

def search_actor(request):
    actor_list = Actor.objects.values('actor_name').order_by('actor_name')
    template = loader.get_template('frankenstein_mobile/search_actor.html')
    context = RequestContext(request, {
        'actor_list': actor_list,
    })
    return HttpResponse(template.render(context))


def results_actor(request):
    queryset = Performance.objects.all()
    actor_name = request.GET.get('actor_name', None)

    if actor_name is not None:
        queryset = queryset.filter(perfactor__actor__actor_name__contains=actor_name).order_by('performance_start_time')

    results = []
    for perf in queryset.all():
        sx = PerformanceSerializer(perf)
        results.append(sx.data)

    message = request.GET['actor_name']
    return render(request, 'frankenstein_mobile/results_actor.html', {'results': json.dumps(results), 'actor_name': message});

###########################################################################

def search_crew(request):
    crew_list = Crew.objects.values('crew_name').order_by('crew_name')
    template = loader.get_template('frankenstein_mobile/search_crew.html')
    context = RequestContext(request, {
        'crew_list': crew_list,
    })
    return HttpResponse(template.render(context))

def results_crew(request):
    queryset = Performance.objects.all()
    crew_name = request.GET.get('crew_name', None)

    if crew_name is not None:
        queryset = queryset.filter(perfcrew__crew__crew_name__contains=crew_name).order_by('performance_start_time')

    results = []
    for perf in queryset.all():
        sx = PerformanceSerializer(perf)
        results.append(sx.data)

    message = request.GET['crew_name']
    return render(request, 'frankenstein_mobile/results_crew.html', {'results': json.dumps(results), 'crew_name': message});


###########################################################################

def search_stage(request):
    stage_list = Stage.objects.values('stage_location').order_by('stage_location')
    template = loader.get_template('frankenstein_mobile/search_stage.html')
    context = RequestContext(request, {
        'stage_list': stage_list,
    })
    return HttpResponse(template.render(context))

def results_stage(request):
    queryset = Performance.objects.all()
    production_name = request.GET.get('production_name', None)
    stage_location = request.GET.get('stage_location', None)
    time_query = request.GET.get('performance_start_time', None)

    if production_name is not None:
        queryset = queryset.filter(performance_production__production_name__contains=production_name)
    if stage_location is not None:
        queryset = queryset.filter(performance_stage__stage_location__contains=stage_location).order_by('performance_start_time')
    if time_query is not None:
        date_time = parse(time_query)
        queryset = queryset.filter(performance_start_time=date_time)

    results = []
    for perf in queryset.all():
        sx = PerformanceSerializer(perf)
        results.append(sx.data)

    message = request.GET['stage_location']
    return render(request, 'frankenstein_mobile/results_stage.html', {'results': json.dumps(results), 'stage_location': message});


###########################################################################

def search_time(request):
    return render(request, 'frankenstein_mobile/search_time.html')

def results_time(request):
    queryset = Performance.objects.all()
    time_query = request.GET.get('performance_start_time', None)

    if time_query is not None:
        date_time = parse(time_query)
        next_day = date_time + timedelta(days=1)
        print date_time, next_day, "asfagaga"
        queryset = queryset.filter(performance_start_time__range=[date_time,next_day]).order_by('performance_start_time')

    results = []
    for perf in queryset.all():
        sx = PerformanceSerializer(perf)
        results.append(sx.data)

    message = request.GET['performance_start_time']
    return render(request, 'frankenstein_mobile/results_time.html', {'results': json.dumps(results), 'date': message})


###########################################################################


def search_performance(request):
    sig_events = SignificantEvent.objects.values('description')
    template = loader.get_template('frankenstein_mobile/search_performance.html')
    context = RequestContext(request, {
        'sig_events': sig_events,
    })
    return HttpResponse(template.render(context))

def results_performance(request):
    queryset = Performance.objects.all()
    production_name = request.GET.get('production_name', None)
    stage_location = request.GET.get('stage_location', None)
    time_query = request.GET.get('performance_start_time', None)
    crew_name = request.GET.get('crew_name', None)
    actor_name = request.GET.get('actor_name', None)
    sig_event =request.GET.get('sig_event', None)

    if crew_name is not None:
        queryset = queryset.filter(perfcrew__crew__crew_name__contains=crew_name)
    if actor_name is not None:
        queryset = queryset.filter(perfactor__actor__actor_name__contains=actor_name)
    if production_name is not None:
        queryset = queryset.filter(performance_production__production_name__contains=production_name)
    if stage_location is not None:
        queryset = queryset.filter(performance_stage__production_name__contains=production_name)
    if time_query is not None:
        date_time = parse(time_query)
        queryset = queryset.filter(performance_start_time=date_time)
    if sig_event is not None:
        queryset = queryset.filter(significantevent__description__contains=sig_event)

    results = []
    for perf in queryset.all():
        sx = PerformanceSerializer(perf)
        results.append(sx.data)

    message = request.GET['sig_event']
    return render(request, 'frankenstein_mobile/results_performance.html', {'results': json.dumps(results), 'sig_event': message});

###########################################################################
def results(request):
    queryset = Performance.objects.all()
    production_name = request.GET.get('production_name', None)
    stage_location = request.GET.get('stage_location', None)
    time_query = request.GET.get('performance_start_time', None)
    crew_name = request.GET.get('crew_name', None)
    actor_name = request.GET.get('actor_name', None)

    if crew_name is not None:
        queryset = queryset.filter(perfcrew__crew__crew_name__contains=crew_name)
    if actor_name is not None:
        queryset = queryset.filter(perfactor__actor__actor_name__contains=actor_name)
    if production_name is not None:
        queryset = queryset.filter(performance_production__production_name__contains=production_name)
    if stage_location is not None:
        queryset = queryset.filter(performance_stage__production_name__contains=production_name)

    results = []
    for perf in queryset.all():
        sx = PerformanceSerializer(perf)
        results.append(sx.data)

    return render(request, 'frankenstein_mobile/results.html', {'results': json.dumps(results)});