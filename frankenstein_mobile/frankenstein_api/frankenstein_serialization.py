__author__ = 'Raymond Macharia <raymond.machira@gmail.com>'

from django.forms import widgets
from rest_framework import serializers
from frankenstein_api.models import Stage, Actor, Performance, Production, Crew

class ActorSerializer(serializers.Serializer):
    id = serializers.Field()  # Note: `Field` is an untyped read-only field.
    actor_name = serializers.CharField(required=False,max_length=200)
    actor_bio = serializers.CharField(required=False,max_length=200)

    def restore_object(self, attrs, instance=None):
        """
        Create or update a new Actor instance, given a dictionary
        of deserialized field values.

        Note that if we don't define this method, then deserializing
        data will simply return a dictionary of items.
        """
        if instance:
            # Update existing instance
            instance.actor_name = attrs.get('actor_name', instance.actor_name)
            instance.actor_bio = attrs.get('code', instance.actor_bio)
            return instance

        # Create new instance
        return Actor(**attrs)