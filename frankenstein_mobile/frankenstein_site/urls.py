from django.conf.urls import patterns, include, url
from django.contrib import admin
from frankenstein_site import views
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static

urlpatterns = patterns('',
    # Examples:
    url(r'^api/', include('api.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.index, name='index'),

    # /actor/
    url(r'^search_actor/$', views.search_actor, name='search_actor'),
    url(r'^search_actor/results_actor/$', views.results_actor, name='results_actor'),

    # /crew/
    url(r'^search_crew/$', views.search_crew, name='search_crew'),
    url(r'^search_crew/results_crew/$', views.results_crew, name='results_crew'),

    # /stage/
    url(r'^search_stage/$', views.search_stage, name='search_stage'),
    url(r'^search_stage/results_stage/$', views.results_stage, name='results_stage'),

    # /time/
    url(r'^search_time/$', views.search_time, name='search_time'),
    url(r'^search_time/results_time/$', views.results_time, name='results_time'),

    # /performance/
    url(r'^search_performance/$', views.search_performance, name='search_performance'),
    url(r'^search_performance/results_performance/$', views.results_performance, name='results_performance'),

) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)