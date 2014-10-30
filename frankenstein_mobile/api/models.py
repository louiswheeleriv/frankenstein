from django.db import models

class Production(models.Model):
    production_name = models.CharField(max_length=200)
    production_info = models.CharField(max_length=200)

    def __unicode__(self):
        return "Production: {0}, Description: {1}".format(self.production_name, self.production_info)


class Stage(models.Model):
    stage_location = models.CharField(max_length=200)
    stage_description = models.CharField(max_length=200)

    def __unicode__(self):
        return "Location: {0}, Description: {1}".format(self.stage_location, self.stage_description)


class Actor(models.Model):
    actor_name = models.CharField(max_length=200)
    actor_bio = models.CharField(max_length=200)

    def __unicode__(self):
        return "Name: {0}, Bio: {1}".format(self.actor_name, self.actor_bio)


class PerfActor(models.Model):
    performance = models.ForeignKey('Performance')
    actor = models.ForeignKey(Actor)
    appearance_time = models.TimeField(blank=True, null=True)
    role = models.CharField(max_length=200)

    def __unicode__(self):
        return 'Actor Performance. Name: {0}, Appearance Time: {1}, Role: {2}'.format(self.actor,
                                                                                      (self.appearance_time.strftime('%H:%M') if self.appearance_time is not None  else ''),
                                                                                      self.role)


class Crew(models.Model):
    crew_name = models.CharField(max_length=200)
    crew_bio = models.CharField(max_length=200)

    def __unicode__(self):
            return "Name: {0}, Bio: {1}".format(self.crew_name, self.crew_bio)


class PerfCrew(models.Model):
    performance = models.ForeignKey('Performance')
    crew = models.ForeignKey(Crew)
    responsibilities = models.CharField(max_length=200)

    def __unicode__(self):
        return 'Crew on Performance. Name: {0}, Responsibility: {1}'.format(self.crew, self.responsibilities)


class Performance(models.Model):
    performance_stage = models.ForeignKey(Stage)
    performance_info = models.CharField(max_length=200)
    performance_start_time = models.DateTimeField()
    performance_production = models.ForeignKey(Production)

    def __unicode__(self):
            return 'Production: {0}, Stage: {1}, Start Time: {2}, Info: {3}'.format(
                self.performance_production, self.performance_stage,
                (self.performance_start_time.strftime('%H:%M, %m/%d/%Y') if self.performance_start_time is not None  else ''),
                self.performance_info)
