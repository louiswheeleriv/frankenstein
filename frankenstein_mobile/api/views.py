from api.models import Actor, Performance, Stage, Crew, PerfActor
from api.frankenstein_serialization import ActorSerializer, PerformanceSerializer, StageSerializer, CrewSerializer, PerfActorSerializer
from rest_framework import generics
from dateutil.parser import parse
from datetime import timedelta


class ActorList(generics.ListCreateAPIView):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer

class ActorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer

class PerfactorList(generics.ListAPIView):
    queryset = PerfActor.objects.all()
    serializer_class = PerfActorSerializer

class PerfactorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PerfActor.objects.all()
    serializer_class = PerfActorSerializer

class PerformanceList(generics.ListCreateAPIView):
    # queryset = Performance.objects.all()
    serializer_class = PerformanceSerializer
    # Show all of the PASSENGERS in particular WORKSPACE
    # or all of the PASSENGERS in particular AIRLINE
    def get_queryset(self):
        queryset = Performance.objects.all()
        actor_name = self.request.QUERY_PARAMS.get('actor_name', None)
        crew_name = self.request.QUERY_PARAMS.get('crew_name', None)
        production_name = self.request.QUERY_PARAMS.get('production_name', None)
        stage_location = self.request.QUERY_PARAMS.get('stage_location', None)
        time_query = self.request.QUERY_PARAMS.get('performance_start_time', None)
        sig_event = self.request.QUERY_PARAMS.get('sig_event', None)

        if actor_name is not None:
            queryset = queryset.filter(perfactor__actor__actor_name__contains=actor_name)
        if crew_name is not None:
            queryset = queryset.filter(perfcrew__crew__crew_name__contains=crew_name)
        if production_name is not None:
            queryset = queryset.filter(performance_production__production_name__contains=production_name)
        if stage_location is not None:
            queryset = queryset.filter(performance_stage__stage_location__contains=stage_location)
        if time_query is not None:
            date_time = parse(time_query)
            next_day = date_time + timedelta(days=1)
            queryset = queryset.filter(performance_start_time__gte = date_time, performance_start_time__lt = next_day)
        if sig_event is not None:
            queryset = queryset.filter(significantevent__description__contains=sig_event)

        return queryset


class PerformanceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Performance.objects.all()
    serializer_class = PerformanceSerializer


class StageList(generics.ListCreateAPIView):
    queryset = Stage.objects.all()
    serializer_class = StageSerializer


class StageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Stage.objects.all()
    serializer_class = StageSerializer


class CrewList(generics.ListCreateAPIView):
    queryset = Crew.objects.all()
    serializer_class = CrewSerializer


class CrewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Crew.objects.all()
    serializer_class = CrewSerializer
