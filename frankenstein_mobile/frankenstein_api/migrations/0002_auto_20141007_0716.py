# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('frankenstein_api', '0001_initial'),
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
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='CrewResponsibility',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('responsibility', models.CharField(max_length=200)),
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
                ('performance_actors', models.ManyToManyField(to='frankenstein_api.Actor')),
                ('performance_crews', models.ManyToManyField(to='frankenstein_api.Crew')),
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
        migrations.RemoveField(
            model_name='choice',
            name='question',
        ),
        migrations.DeleteModel(
            name='Choice',
        ),
        migrations.DeleteModel(
            name='Question',
        ),
        migrations.AddField(
            model_name='performance',
            name='performance_production_id',
            field=models.ForeignKey(to='frankenstein_api.Production'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='performance',
            name='performance_stage_id',
            field=models.ForeignKey(to='frankenstein_api.Stage'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='crew',
            name='crew_bio',
            field=models.ForeignKey(to='frankenstein_api.CrewResponsibility'),
            preserve_default=True,
        ),
    ]
