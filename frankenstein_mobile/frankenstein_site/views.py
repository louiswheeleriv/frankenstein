from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
from django_tables2   import RequestConfig

from api.models import Production, Stage, Actor, CrewResponsibility, Crew, Performance
from api.tables import ActorTable, PerformanceTable, StageTable, CrewRespTable, CrewTable

def index(request):
    current_production = Production.objects.order_by('-id')[:5]
    template = loader.get_template('frankenstein_mobile/index.html')
    context = RequestContext(request, {
        'current_production': current_production,
    })
    return HttpResponse(template.render(context))

def results(request):
    table = ActorTable(Actor.objects.all())
    # table = PerformanceTable(Performance.objects.all())
    # table = StageTable(Stage.objects.all())
    # table = CrewRespTable(CrewResponsibility.objects.all())
    # table = CrewTable(Crew.objects.all())

    RequestConfig(request).configure(table)
    return render(request, 'frankenstein_mobile/results.html', {'table': table})

# def results(request):
#     return render(request, "frankenstein_mobile/results.html", {"actors": Actor.objects.all()})

# def search(request):
#     latest_actor_list = Actor.objects.order_by('-id')[:5]
#     template = loader.get_template('frankenstein_mobile/search.html')
#     context = RequestContext(request, {
#         'latest_actor_list': latest_actor_list,
#     })
#     return HttpResponse(template.render(context))

# def results(request, question_id):
#     response = "The results of search based on category %s."
#     return HttpResponse(response % question_id)



    # all_performances = Performance.objects.all()
    # template = loader.get_template('frankenstein_mobile/results.html')
    # context = RequestContext(request, {
    #     'all_performances': all_performances,
    # })
    # return HttpResponse(template.render(context))

def search_actor(request):
    latest_actor_list = Actor.objects.order_by('-id')[:5]
    template = loader.get_template('frankenstein_mobile/search_actor.html')
    context = RequestContext(request, {
        'latest_actor_list': latest_actor_list,
    })
    return HttpResponse(template.render(context))

def search_crew(request):
    latest_actor_list = Actor.objects.order_by('-id')[:5]
    template = loader.get_template('frankenstein_mobile/search_crew.html')
    context = RequestContext(request, {
        'latest_actor_list': latest_actor_list,
    })
    return HttpResponse(template.render(context))

def search_stage(request):
    latest_actor_list = Actor.objects.order_by('-id')[:5]
    template = loader.get_template('frankenstein_mobile/search_stage.html')
    context = RequestContext(request, {
        'latest_actor_list': latest_actor_list,
    })
    return HttpResponse(template.render(context))

def search_performance(request):
    latest_actor_list = Actor.objects.order_by('-id')[:5]
    template = loader.get_template('frankenstein_mobile/search_performance.html')
    context = RequestContext(request, {
        'latest_actor_list': latest_actor_list,
    })
    return HttpResponse(template.render(context))

def search_time(request):
    latest_actor_list = Actor.objects.order_by('-id')[:5]
    template = loader.get_template('frankenstein_mobile/search_time.html')
    context = RequestContext(request, {
        'latest_actor_list': latest_actor_list,
    })
    return HttpResponse(template.render(context))