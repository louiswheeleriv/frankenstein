from django.shortcuts import render
from django.http import HttpResponse, QueryDict, HttpRequest
from django.template import RequestContext, loader

from api.frankenstein_serialization import PerformanceSerializer
from api.models import Production, Stage, Actor, Crew, Performance
from api.views import PerformanceList
from dateutil.parser import  parse
import json

def index(request):
    return render(request, 'frankenstein_mobile/index.html')

###########################################################################

def search_actor(request):
    actor_list = Actor.objects.values('actor_name')
    template = loader.get_template('frankenstein_mobile/search_actor.html')
    context = RequestContext(request, {
        'actor_list': actor_list,
    })
    return HttpResponse(template.render(context))


def results_actor(request):
    queryset = Performance.objects.all()
    actor_name = request.GET.get('actor_name', None)
    production_name = request.GET.get('production_name', None)
    stage_location = request.GET.get('stage_location', None)
    time_query = request.GET.get('performance_start_time', None)

    if actor_name is not None:
        queryset = queryset.filter(perfactor__actor__actor_name__contains=actor_name)
    if production_name is not None:
        queryset = queryset.filter(performance_production__production_name__contains=production_name)
    if stage_location is not None:
        queryset = queryset.filter(performance_stage__production_name__contains=production_name)
    if time_query is not None:
        date_time = parse(time_query)
        queryset = queryset.filter(performance_start_time=date_time)

    results = []
    for perf in queryset.all():
        sx = PerformanceSerializer(perf)
        results.append(sx.data)

    message = request.GET['actor_name']
    return render(request, 'frankenstein_mobile/results_actor.html', {'results': json.dumps(results), 'actor_name': message});

###########################################################################

def search_crew(request):
    crew_list = Crew.objects.values('crew_name')
    template = loader.get_template('frankenstein_mobile/search_crew.html')
    context = RequestContext(request, {
        'crew_list': crew_list,
    })
    return HttpResponse(template.render(context))

def results_crew(request):
    queryset = Performance.objects.all()
    crew_name = request.GET.get('crew_name', None)
    production_name = request.GET.get('production_name', None)
    stage_location = request.GET.get('stage_location', None)
    time_query = request.GET.get('performance_start_time', None)

    if crew_name is not None:
        queryset = queryset.filter(perfcrew__crew__crew_name__contains=crew_name)
    if production_name is not None:
        queryset = queryset.filter(performance_production__production_name__contains=production_name)
    if stage_location is not None:
        queryset = queryset.filter(performance_stage__production_name__contains=production_name)
    if time_query is not None:
        date_time = parse(time_query)
        queryset = queryset.filter(performance_start_time=date_time)

    results = []
    for perf in queryset.all():
        sx = PerformanceSerializer(perf)
        results.append(sx.data)

    message = request.GET['crew_name']
    return render(request, 'frankenstein_mobile/results_crew.html', {'results': json.dumps(results), 'crew_name': message});



###########################################################################

def search_stage(request):
    stage_list = Stage.objects.values('stage_location')
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
        queryset = queryset.filter(performance_stage__production_name__contains=production_name)
    if time_query is not None:
        date_time = parse(time_query)
        queryset = queryset.filter(performance_start_time=date_time)

    results = []
    for perf in queryset.all():
        sx = PerformanceSerializer(perf)
        results.append(sx.data)

    message = request.GET['stage']
    return render(request, 'frankenstein_mobile/results_stage.html', {'results': json.dumps(results), 'stage_location': message});


###########################################################################

def search_time(request):
    return render(request, 'frankenstein_mobile/search_time.html')

def results_time(request):
    if request.GET.get('q'):
        message = request.GET['q']
    else:
        message = ''

    # if Performance.objects.filter(performance_start_time=message).exists():
    #     table = PerformanceTable(Performance.objects.filter(performance_start_time=message))
    #
    #     RequestConfig(request).configure(table)
    #     return render(request, 'frankenstein_mobile/results_time.html', {'table': table})
    # else:
    #     return render(request, 'frankenstein_mobile/results_notfound.html')


###########################################################################


def search_performance(request):
    performance_list = Performance.objects.values('performance_info')
    template = loader.get_template('frankenstein_mobile/search_performance.html')
    context = RequestContext(request, {
        'performance_list': performance_list,
    })
    return HttpResponse(template.render(context))

def results_performance(request):
    if request.GET.get('q'):
        message = request.GET['q']
    else:
        message = ''

    # if Performance.objects.filter(performance_info=message).exists():
    #     table = PerformanceTable(Performance.objects.filter(performance_info=message))
    #
    #     RequestConfig(request).configure(table)
    #     return render(request, 'frankenstein_mobile/results_performance.html', {'table': table})
    # else:
    #     return render(request, 'frankenstein_mobile/results_notfound.html')