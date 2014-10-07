from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'frankenstein_mobile.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^frankenstein_api/', include('frankenstein_api.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
