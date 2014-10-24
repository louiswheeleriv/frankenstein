from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django_tables2   import RequestConfig

from api.models import Production, Stage, Actor, CrewResponsibility, Crew, Performance
from api.tables import ActorTable, PerformanceTable, StageTable, CrewRespTable, CrewTable
from api.forms import ActorForm

def index(request):
    current_production = Production.objects.order_by('-id')[:5]
    template = loader.get_template('frankenstein_mobile/index.html')
    context = RequestContext(request, {
        'current_production': current_production,
    })
    return HttpResponse(template.render(context))

###########################################################################

def search_actor(request):
    current_production = Production.objects.order_by('-id')[:5]
    template = loader.get_template('frankenstein_mobile/search_actor.html')
    context = RequestContext(request, {
        'current_production': current_production,
    })
    return HttpResponse(template.render(context))

def results_actor(request):
    if request.GET.get('q'):
        message = request.GET['q']
    else:
        message = ''

    table = ActorTable(Actor.objects.filter(actor_name=message))

    RequestConfig(request).configure(table)
    return render(request, 'frankenstein_mobile/results_actor.html', {'table': table})

###########################################################################

def search_crew(request):
    latest_crew_list = Crew.objects.order_by('-id')[:5]
    template = loader.get_template('frankenstein_mobile/search_crew.html')
    context = RequestContext(request, {
        'latest_crew_list': latest_crew_list,
    })
    return HttpResponse(template.render(context))

def results_crew(request):
    if request.GET.get('q'):
        message = request.GET['q']
    else:
        message = ''

    table = CrewTable(Crew.objects.filter(crew_name=message))

    RequestConfig(request).configure(table)
    return render(request, 'frankenstein_mobile/results_crew.html', {'table': table})

###########################################################################

def search_stage(request):
    latest_stage_list = Stage.objects.order_by('-id')[:5]
    template = loader.get_template('frankenstein_mobile/search_stage.html')
    context = RequestContext(request, {
        'latest_stage_list': latest_stage_list,
    })
    return HttpResponse(template.render(context))

def results_stage(request):
    if request.GET.get('q'):
        message = request.GET['q']
    else:
        message = ''

    table = StageTable(Stage.objects.filter(stage_location=message))

    RequestConfig(request).configure(table)
    return render(request, 'frankenstein_mobile/results_stage.html', {'table': table})

###########################################################################

def search_time(request):
    latest_performance_list = Performance.objects.order_by('-id')[:5]
    template = loader.get_template('frankenstein_mobile/search_time.html')
    context = RequestContext(request, {
        'latest_performance_list': latest_performance_list,
    })
    return HttpResponse(template.render(context))

def results_time(request):
    if request.GET.get('q'):
        message = request.GET['q']
    else:
        message = ''

    table = PerformanceTable(Performance.objects.filter(performance_start_time=message))

    RequestConfig(request).configure(table)
    return render(request, 'frankenstein_mobile/results_time.html', {'table': table})

###########################################################################





def search_performance(request):
    latest_actor_list = Actor.objects.order_by('-id')[:5]
    template = loader.get_template('frankenstein_mobile/search_performance.html')
    context = RequestContext(request, {
        'latest_actor_list': latest_actor_list,
    })
    return HttpResponse(template.render(context))

