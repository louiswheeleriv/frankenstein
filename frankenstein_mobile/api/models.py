# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin.py sqlcustom [app_label]'
# into your database.
from __future__ import unicode_literals

from django.db import models


class Actor(models.Model):
    actorid = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50, blank=True)
    bio = models.TextField(blank=True)

    class Meta:
        managed = False
        db_table = 'actor'


class Crew(models.Model):
    crewid = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50, blank=True)
    responsiblities = models.CharField(max_length=50, blank=True)
    bio = models.TextField(blank=True)

    class Meta:
        managed = False
        db_table = 'crew'


class Perfactor(models.Model):
    performanceid = models.ForeignKey('Performance', db_column='performanceid', blank=True, null=True)
    actorid = models.ForeignKey(Actor, db_column='actorid', blank=True, null=True)
    appearancetime = models.TimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'perfactor'


class Perfcrew(models.Model):
    performanceid = models.ForeignKey('Performance', db_column='performanceid', blank=True, null=True)
    crewid = models.ForeignKey(Crew, db_column='crewid', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'perfcrew'


class Performance(models.Model):
    performanceid = models.IntegerField(primary_key=True)
    info = models.TextField(blank=True)
    stageid = models.ForeignKey('Stage', db_column='stageid', blank=True, null=True)
    starttime = models.TimeField(blank=True, null=True)
    productionid = models.ForeignKey('Production', db_column='productionid', blank=True, null=True)
    actors = models.ManyToManyField(Actor, through='Perfactor',through_fields=( 'performanceid','actorid'))
    crews = models.ManyToManyField(Crew, through='Perfcrew', through_fields=('performanceid','crewid'))

    class Meta:
        managed = False
        db_table = 'performance'


class Production(models.Model):
    productionid = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50, blank=True)
    info = models.TextField(blank=True)

    class Meta:
        managed = False
        db_table = 'production'


class Stage(models.Model):
    stageid = models.IntegerField(primary_key=True)
    location = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)

    class Meta:
        managed = False
        db_table = 'stage'