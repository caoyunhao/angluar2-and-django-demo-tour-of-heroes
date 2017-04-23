from django.contrib.auth.models import User, Group
from .models import Hero
from rest_framework import serializers


class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ('id', 'name',)
    #
    # def create(self, validated_data):
    #     Hero.objects.create(**validated_data)
    #
    # def update(self, instance, validated_data):
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.save()
    #     return instance
