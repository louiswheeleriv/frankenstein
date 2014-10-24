from api.models import Actor, Performance, Stage, Crew, PerfActor
from api.frankenstein_serialization import ActorSerializer, PerformanceSerializer, StageSerializer, CrewSerializer, PerfActorSerializer
from rest_framework import generics


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
    queryset = Performance.objects.all()
    serializer_class = PerformanceSerializer


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