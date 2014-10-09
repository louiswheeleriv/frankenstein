__author__ = 'Raymond Macharia <raymond.machira@gmail.com>'
from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns


from api import views

urlpatterns = patterns('api.views',
                       url(r'^actors/$', views.ActorList.as_view()),
                       url(r'^actors/(?P<pk>[0-9]+)/$', views.ActorDetail.as_view()),
                       url(r'^performances/$', views.PerformanceList.as_view()),
                       url(r'^performances/(?P<pk>[0-9]+)/$', views.PerformanceDetail.as_view()),
                       url(r'^crews/$', views.CrewList.as_view()),
                       url(r'^crews/(?P<pk>[0-9]+)/$', views.CrewDetail.as_view()),
                       url(r'^stages/$', views.StageList.as_view()),
                       url(r'^stages/(?P<pk>[0-9]+)/$', views.StageDetail.as_view()),
                       )
urlpatterns = format_suffix_patterns(urlpatterns)
