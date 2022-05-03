"""strongest_link_proj URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

# these are some endpoints that will handle login, logout, signup, and token refresh
urlpatterns = [
<<<<<<< HEAD
    path('admin/', admin.site.urls),
    path("", include("strongest_link_app.urls"))
=======
    path("admin/", admin.site.urls),
    path("api/", include("strongest_link_app.urls")),
    # this path below will add a log-in option to the DRF API root view if you aren't already logged in via admin panel or site
    path("api-auth/", include("rest_framework.urls")),
    # these three routes below handle all of our user authentication, registration, and token management without the need to write any further code.  additionally, they can be configured to handle JWT auth (which is what I have it set to currently), built-in Django token auth, session/cookie-based auth, or even logging in / integration with other social networks
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path("dj-rest-auth/token/refresh/", include("dj_rest_auth.urls")),
    path("dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
>>>>>>> main
]
