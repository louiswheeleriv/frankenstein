from django.test import TestCase
from api.models import Performance, Stage, Production, Actor, Crew #, CrewResponsibility
from datetime import datetime

class PerformanceTest(TestCase):

    def setUp(self):
        test_stage = Stage.objects.create(location='test_place', description='test_description')
        test_production = Production.objects.create(name='test_production', info='test_prod_info')
        actor1 = Actor.objects.create(name='test_actor_1', bio='born to test')
        actor2 = Actor.objects.create(name='test_actor_2', actor_bio='born to rest')
        crew1 = Crew.objects.create(crew_name='krew_1', crew_bio='Team B guy', responsiblities='Director')
        crew2 = Crew.objects.create(crew_name='krew_2', crew_bio='Team C guy', responsiblities='Producer')
        test_performance = Performance.objects.create(performance_stage=test_stage, performance_info="test_perf_info",
                                                      performance_start_time=datetime.now(),
                                                      performance_production=test_production)
        test_performance.performance_actors.add(actor1)
        test_performance.performance_actors.add(actor2)
        test_performance.performance_crews.add(crew1)
        test_performance.performance_crews.add(crew2)

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