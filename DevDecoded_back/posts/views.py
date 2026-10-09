
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from .models import Posts
from .serializers import PostsSerializer

from users.permissions import IsAdminRole
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    serializer = PostsSerializer(data=request.data)

    if serializer.is_valid():
        post = serializer.save(
            author=request.user,
            status='PENDING'
        )

        return Response({
            'message': 'Post created and pending approval',
            'post': PostsSerializer(post).data
        }, status=status.HTTP_201_CREATED)

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_posts(request):
    posts = Posts.objects.filter(author=request.user).order_by('-created_at')
    serializer = PostsSerializer(posts, many=True)

    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def post_detail(request, post_id):
    post = get_object_or_404(Posts, id=post_id)

    # Authors can access only their own posts.
    # Admins can access any post.
    if request.user.role != 'ADMIN' and post.author_id != request.user.id:
        return Response(
            {'error': 'You do not have permission to access this post.'},
            status=status.HTTP_403_FORBIDDEN
        )

    if request.method == 'GET':
        return Response(PostsSerializer(post).data)

    if request.method == 'PUT':
        serializer = PostsSerializer(post, data=request.data)

        if serializer.is_valid():
            # Authors must get approval again after editing a post.
            if request.user.role == 'ADMIN':
                serializer.save()
            else:
                serializer.save(status='PENDING')

            return Response({
                'message': 'Post updated successfully',
                'post': PostsSerializer(post).data
            })

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    if request.method == 'DELETE':
        post.delete()

        return Response(
            {'message': 'Post deleted successfully'},
            status=status.HTTP_200_OK
        )
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminRole])
def pending_posts(request):
    posts = Posts.objects.filter(
        status='PENDING'
    ).order_by('-created_at')

    serializer = PostsSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminRole])
def update_post_status(request, post_id):
    post = get_object_or_404(Posts, id=post_id)

    new_status = request.data.get('status')

    if new_status not in ['APPROVED', 'REJECTED']:
        return Response(
            {'error': 'Status must be APPROVED or REJECTED.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    post.status = new_status
    post.save(update_fields=['status', 'updated_at'])

    return Response({
        'message': 'Post status updated',
        'postId': post.id,
        'status': post.status
    })


@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminRole])
def admin_delete_post(request, post_id):
    post = get_object_or_404(Posts, id=post_id)
    post.delete()

    return Response(
        {'message': 'Post deleted successfully'},
        status=status.HTTP_200_OK
    )

# View all approved posts
@api_view(['GET'])
@permission_classes([AllowAny])
def public_posts(request):
    posts = Posts.objects.filter(
        status='APPROVED'
    ).order_by('-created_at')

    search_query = request.query_params.get('search')

    if search_query:
        posts = posts.filter(title__icontains=search_query)

    paginator = PageNumberPagination()
    paginator.page_size = 5

    page = paginator.paginate_queryset(posts, request)
    serializer = PostsSerializer(page, many=True)

    return paginator.get_paginated_response(serializer.data)



# View one approved post
@api_view(['GET'])
@permission_classes([AllowAny])
def public_post_detail(request, post_id):
    post = get_object_or_404(
        Posts,
        id=post_id,
        status='APPROVED'
    )

    serializer = PostsSerializer(post)
    return Response(serializer.data)

