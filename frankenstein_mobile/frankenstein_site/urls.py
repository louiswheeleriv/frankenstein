from django.conf.urls import patterns, include, url
from django.contrib import admin
from frankenstein_site import views

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'frankenstein_site.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^api/', include('api.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.index, name='index'),
)
