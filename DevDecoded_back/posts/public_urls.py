from django.urls import path
from . import views

urlpatterns = [
    path('', views.public_posts, name='public_posts'),
    path(
        '<int:post_id>/',
        views.public_post_detail,
        name='public_post_detail'
    ),
]
