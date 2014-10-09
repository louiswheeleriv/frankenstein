# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20141007_0716'),
    ]

    operations = [
        migrations.AddField(
            model_name='crew',
            name='crew_responsibility',
            field=models.ForeignKey(default=1, to='api.CrewResponsibility'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='crew',
            name='crew_bio',
            field=models.CharField(max_length=200),
        ),
    ]
