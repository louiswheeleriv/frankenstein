# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20141007_0732'),
    ]

    operations = [
        migrations.RenameField(
            model_name='performance',
            old_name='performance_production_id',
            new_name='performance_production',
        ),
        migrations.RenameField(
            model_name='performance',
            old_name='performance_stage_id',
            new_name='performance_stage',
        ),
    ]
