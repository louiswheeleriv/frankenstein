from django.shortcuts import render
from django.http import HttpResponse, QueryDict, HttpRequest
from django.template import RequestContext, loader

from api.frankenstein_serialization import PerformanceSerializer
from api.models import Production, Stage, Actor, Crew, Performance
from api.views import PerformanceList
import json

def index(request):
    return render(request, 'frankenstein_mobile/index.html')

###########################################################################

def search_actor(request):
    return render(request, 'frankenstein_mobile/search_actor.html')

def results_actor(request):
    if request.GET.get('q'):
        message = request.GET['q']
    else:
        message = ''

    qdict = QueryDict('actor_name={0}&format=json'.format(message))
    h = HttpRequest()
    h.GET = qdict
    h.QUERY_PARAMS = qdict
    p = PerformanceList()
    sx = PerformanceSerializer()
    sx = PerformanceSerializer(p.get_queryset().get())

    # sx.data is the data!!!
    results = sx.data
    return render(request, 'frankenstein_mobile/results_actor.html', {'results': json.dumps(results)});

###########################################################################

def search_crew(request):
    return render(request, 'frankenstein_mobile/search_crew.html')

def results_crew(request):
    if request.GET.get('q'):
        message = request.GET['q']
    else:
        message = ''

    qdict = QueryDict('crew_name={0}&format=json'.format(message))
    h = HttpRequest()
    h.GET = qdict
    h.QUERY_PARAMS = qdict
    p = PerformanceList()
    sx = PerformanceSerializer()
    sx = PerformanceSerializer(p.get_queryset().get())

    # sx.data is the data!!!
    results = sx.data
    return render(request, 'frankenstein_mobile/results_crew.html', {'results': json.dumps(results)});

    # if Crew.objects.filter(crew_name=message).exists():
    #     table = CrewTable(Crew.objects.filter(crew_name=message))
    #
    #     RequestConfig(request).configure(table)
    #     return render(request, 'frankenstein_mobile/results_crew.html', {'table': table})
    # else:
    #     return render(request, 'frankenstein_mobile/results_notfound.html')


###########################################################################

def search_stage(request):
    return render(request, 'frankenstein_mobile/search_stage.html')

def results_stage(request):
    if request.GET.get('q'):
        message = request.GET['q']
    else:
        message = ''

    # if Stage.objects.filter(stage_location=message).exists():
    #     table = StageTable(Stage.objects.filter(stage_location=message))
    #
    #     RequestConfig(request).configure(table)
    #     return render(request, 'frankenstein_mobile/results_stage.html', {'table': table})
    # else:
    #     return render(request, 'frankenstein_mobile/results_notfound.html')


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