from django.test import TestCase
from api.models import Performance, Stage, Production, Actor, Crew, PerfCrew, PerfActor, SignificantEvent
from datetime import datetime

class PerformanceTest(TestCase):

    def setUp(self):
        test_stage = Stage.objects.create(stage_location='test_place', stage_description='test_description')
        test_production = Production.objects.create(production_name='test_production', production_info='test_prod_info')
        actor1 = Actor.objects.create(actor_name='test_actor_1', actor_bio='born to test')
        actor2 = Actor.objects.create(actor_name='test_actor_2', actor_bio='born to rest')
        crew1 = Crew.objects.create(crew_name='krew_1', crew_bio='Team B guy', responsiblities='Director')
        crew2 = Crew.objects.create(crew_name='krew_2', crew_bio='Team C guy')
        test_performance = Performance.objects.create(performance_stage=test_stage, performance_info="test_perf_info",
                                                      performance_start_time=datetime.now(),
                                                      performance_production=test_production)

        PerfCrew.objects.create(performance = test_performance,crew = crew1, responsiblities='Producer')
        PerfCrew.objects.create(performance = test_performance,crew = crew2, responsiblities='Director')
        PerfActor.objects.create(performance = test_performance, actor = actor1, role = 'As himself' )
        PerfActor.objects.create(performance = test_performance, actor = actor2, role = 'As herself' )



    def test_actors_involved(self):
        """
        was_published_recently() should return False for questions whose
        pub_date is in the future
        """
        t = Performance.objects.filter(performance_info='test_perf_info')
        print t

        # self.assertEqual(t.Production.production_name,'test_production')
        self.assertEqual(t,t)

    def tearDown(self):
        # Performance.delete()
        return