from django.contrib import admin
from frankenstein_api.models import Performance, Actor, Stage, Crew, Production

admin.site.register(Production)
admin.site.register(Performance)
admin.site.register(Actor)
admin.site.register(Stage)
admin.site.register(Crew)
# Register your models here.
