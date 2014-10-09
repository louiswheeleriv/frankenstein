from django.contrib import admin
from api.models import Performance, Actor, Stage, Crew, Production, CrewResponsibility

admin.site.register(Production)
admin.site.register(Performance)
admin.site.register(Actor)
admin.site.register(Stage)
admin.site.register(Crew)
admin.site.register(CrewResponsibility)
# Register your models here.
