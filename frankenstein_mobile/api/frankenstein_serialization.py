__author__ = 'Raymond Macharia <raymond.machira@gmail.com>'

from rest_framework import serializers
from api.models import Stage, Actor, Performance, Production, Crew


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ('id', 'actor_name', 'actor_bio')


class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = ('id', 'stage_location', 'stage_description')


class ProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Production
        fields = ('id', 'production_name', 'production_info')


class CrewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crew
        fields = ('id', 'crew_name', 'crew_responsibility', 'crew_bio')

class PerformanceSerializer(serializers.ModelSerializer):
    performance_stage = StageSerializer(many=False)
    performance_crews = CrewSerializer(many=True)
    performance_actors = ActorSerializer(many=True)
    performance_production = ProductionSerializer(many=False)

    def transform_performance_start_time(self,object,value):
        return  value.strftime('%m/%d/%Y')


    class Meta:
        model = Performance
        fields = ('id', 'performance_info', 'performance_start_time', 'performance_production',
                  'performance_stage','performance_actors', 'performance_crews')