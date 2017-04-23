from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser

from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

# from rest_framework import viewsets

from .models import Hero
from . import models

from .serializers import HeroSerializer


@csrf_exempt
def login_action(request):
    f_username = request.POST.get('username')
    f_password = request.POST.get('username')
    user = models.User.objects.get(pk=f_username)
    if user is None:
        return HttpResponse('no this username')
    if f_password == user.password:
        request.session['login'] = True
        return HttpResponse('success')
    else:
        return HttpResponse('password is wrong')


@csrf_exempt
def hero_list(request):
    if request.method == 'GET':
        heroes = Hero.objects.all()
        serializer = HeroSerializer(heroes, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        print('hero_list POST')
        data = JSONParser().parse(request)
        print(data)
        serializer = HeroSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def hero_detail(request, hero_id):
    # f_id = request.data.get('id')
    # f_name = request.data.get('name')
    # hero = models.Hero.objects.get(pk=f_id)
    # if hero is None:
    #     return HttpResponse('')
    # hero.name = f_name
    # hero.save()
    try:
        hero = models.Hero.objects.get(pk=hero_id)
    except Hero.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = HeroSerializer(hero)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        print(data)
        serializer = HeroSerializer(hero, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        hero.delete()
        serializer = HeroSerializer(hero)
        #return HttpResponse(status=204)
        return JsonResponse(serializer.data)


# class HeroViewSet(viewsets.ModelViewSet):
#     """
#     允许查看和编辑user 的 API endpoint
#     """
#     queryset = Hero.objects.all()
#     serializer_class = HeroSerializer
