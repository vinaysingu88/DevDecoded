
from rest_framework import serializers
from .models import Posts


class PostsSerializer(serializers.ModelSerializer):

    author = serializers.ReadOnlyField(source='author.name')

    class Meta:
        model = Posts
        fields = [
            'id',
            'title',
            'content',
            'author',
            'status',
            'created_at',
            'updated_at',
        ]

        read_only_fields = [
            'id',
            'author',
            'status',
            'created_at',
            'updated_at',
        ]
