# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Actor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('actor_name', models.CharField(max_length=200)),
                ('actor_bio', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Crew',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('crew_name', models.CharField(max_length=200)),
                ('crew_bio', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PerfActor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('appearance_time', models.IntegerField(default=0)),
                ('role', models.CharField(max_length=200)),
                ('actor', models.ForeignKey(to='api.Actor')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='PerfCrew',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('responsibilities', models.CharField(max_length=200)),
                ('crew', models.ForeignKey(to='api.Crew')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Performance',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('performance_info', models.CharField(max_length=200)),
                ('performance_start_time', models.DateTimeField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Production',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('production_name', models.CharField(max_length=200)),
                ('production_info', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='SignificantEvent',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('description', models.CharField(max_length=200)),
                ('performance', models.ForeignKey(to='api.Performance')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Stage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('stage_location', models.CharField(max_length=200)),
                ('stage_description', models.CharField(max_length=200)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='performance',
            name='performance_production',
            field=models.ForeignKey(to='api.Production'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='performance',
            name='performance_stage',
            field=models.ForeignKey(to='api.Stage'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='perfcrew',
            name='performance',
            field=models.ForeignKey(to='api.Performance'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='perfactor',
            name='performance',
            field=models.ForeignKey(to='api.Performance'),
            preserve_default=True,
        ),
    ]
