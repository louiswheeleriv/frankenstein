__author__ = 'Raymond Macharia <raymond.machira@gmail.com>'
from django.conf.urls import patterns, url

from frankenstein_api import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
)