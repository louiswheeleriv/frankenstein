__author__ = 'Raymond Macharia <raymond.machira@gmail.com>'

from rest_framework import serializers
from api.models import Stage, Actor, Performance, Production, Crew, PerfActor, PerfCrew


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ('actor_name', 'actor_bio')


class PerfActorSerializer(serializers.HyperlinkedModelSerializer):
    name = serializers.Field(source='actor.actor_name')
    bio = serializers.Field(source='actor.actor_bio')
    role = serializers.Field(source='role')

    class Meta:
        model = PerfActor
        fields = ('name', 'bio', 'role', 'appearance_time', 'role')


class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = ('stage_location', 'stage_description')


class ProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Production
        fields = ('production_name', 'production_info')


class CrewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crew
        fields = ('crew_name', 'crew_bio')


class PerfCrewSerializer(serializers.ModelSerializer):
    name = serializers.Field(source='crew.crew_name')
    bio = serializers.Field(source='crew.crew_bio')

    class Meta:
        model = PerfCrew
        fields = ('name', 'bio', 'responsibilities')


class PerformanceSerializer(serializers.ModelSerializer):
    performance_stage = StageSerializer(many=False)
    performance_crews = PerfCrewSerializer(source='perfcrew_set', many=True)
    performance_actors = PerfActorSerializer(source='perfactor_set', many=True)
    performance_production = ProductionSerializer(many=False)

    def transform_performance_start_time(self, object, value):
        if value is not None:
            return value.strftime('%m/%d/%Y')
        else:
            return ''

    class Meta:
        model = Performance
        fields = ('performance_info', 'performance_start_time', 'performance_production',
                  'performance_stage', 'performance_actors', 'performance_crews')
