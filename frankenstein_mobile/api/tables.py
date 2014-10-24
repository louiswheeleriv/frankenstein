import django_tables2 as tables
from api.models import Production, Stage, Actor, CrewResponsibility, Crew, Performance

class ActorTable(tables.Table):
    class Meta:
        model = Actor
        # add class="paleblue" to <table> tag
        attrs = {"class": "paleblue"}
        fields = ('actor_name', 'actor_bio')
        sequence = ('actor_name', 'actor_bio')

class PerformanceTable(tables.Table):
    class Meta:
        model = Performance
        # add class="paleblue" to <table> tag
        attrs = {"class": "paleblue"}
        fields = ('performance_info', 'performance_stage', 'performance_start_time', 'performance_actors', 'performance_crews')
        sequence = ('performance_info', 'performance_stage', 'performance_start_time', 'performance_actors', 'performance_crews')

class StageTable(tables.Table):
    class Meta:
        model = Stage
        # add class="paleblue" to <table> tag
        attrs = {"class": "paleblue"}
        fields = ('stage_location', 'stage_description')
        sequence = ('stage_location', 'stage_description')

class CrewTable(tables.Table):
    class Meta:
        model = Crew
        # add class="paleblue" to <table> tag
        attrs = {"class": "paleblue"}
        fields = ('crew_name', 'crew_responsibility', 'crew_bio')
        sequence = ('crew_name', 'crew_responsibility', 'crew_bio')


class CrewRespTable(tables.Table):
    class Meta:
        model = CrewResponsibility
        # add class="paleblue" to <table> tag
        attrs = {"class": "paleblue"}
        fields = ('responsibility')
        sequence = ('responsibility')