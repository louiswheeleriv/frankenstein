__author__ = 'Raymond Macharia <raymond.machira@gmail.com>'

from rest_framework import serializers
from api.models import Stage, Actor, Performance, Production, Crew, Perfactor


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = ('name', 'bio')


class PerfActorSerializer(serializers.HyperlinkedModelSerializer):
    # name = serializers.Field(source='actorid.name')
    # bio = serializers.Field(source='actorid.bio')
    actor = ActorSerializer(source='actorid')

    class Meta:
        model = Perfactor
        fields = ('actor', 'appearancetime')


class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = ('location', 'description')


class ProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Production
        fields = ('name', 'info')


class CrewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crew
        fields = ('name', 'bio')

class PerformanceSerializer(serializers.ModelSerializer):
    stageid = StageSerializer(many=False)
    crews = CrewSerializer(many=True)
    actor = PerfActorSerializer(source='actors',many=True)
    productionid = ProductionSerializer(many=False)

    class Meta:
        model = Performance
        fields = ('performanceid','info', 'starttime', 'productionid',
                  'stageid', 'actor')