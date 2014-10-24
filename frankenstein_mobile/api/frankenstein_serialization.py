__author__ = 'Raymond Macharia <raymond.machira@gmail.com>'

from rest_framework import serializers
from api.models import Stage, Actor, Performance, Production, Crew, PerfActor


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ('actor_name', 'actor_bio')


class PerfActorSerializer(serializers.HyperlinkedModelSerializer):
    name = serializers.Field(source='actor_name')
    bio = serializers.Field(source='actor_bio')
    role = serializers.Field(source='actor.role')

    # appearance_time = serializers.Field(source='appearance_time')
    # actor = ActorSerializer(many=False)

    class Meta:
        model = PerfActor
        fields = ('name','bio','role')


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

class PerformanceSerializer(serializers.ModelSerializer):
    performance_stage = StageSerializer(many=False)
    # performance_crews = CrewSerializer(many=True)
    # performance_actors = PerfActorSerializer(source = 'performance_actors', many=True,read_only=True)
    performance_actors = serializers.RelatedField(many=True)
    performance_production = ProductionSerializer(many=False)

    class Meta:
        model = Performance
        fields = ('performance_info', 'performance_start_time', 'performance_production',
                  'performance_stage', 'performance_actors')