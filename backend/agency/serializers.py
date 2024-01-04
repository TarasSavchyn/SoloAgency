from rest_framework import serializers
from agency.models import (
    Service,
    Agency,
    EventType,
    Organizer,
    Event,
    Advice,
    Review,
    CallRequest,
    Article,
)


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ("id", "title", "content")


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ("id", "name", "description")


class AgencySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = Agency
        fields = ("id", "name", "services")


class EventTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventType
        fields = ("id", "name", "description", "photo")


class OrganizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organizer
        fields = (
            "id",
            "description",
            "first_name",
            "last_name",
            "position",
            "phone",
            "email",
            "full_name",
            "photo",
        )


class EventSerializer(serializers.ModelSerializer):
    organizers = OrganizerSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = (
            "id",
            "organizers",
            "description",
            "name",
            "number_of_guests",
            "event_type",
            "date",
            "style",
            "user",
            "created_at",
        )


class AdviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advice
        fields = ("id", "question", "answer")





class CallRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallRequest
        fields = (
            "id",
            "name",
            "description",
            "phone",
            "city",
            "created_at",
        )


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = (
            "id",
            "user",
            "text",
            "rating",
            "created_at",
            "is_approved",
        )



class ReviewListSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(
        source="user.first_name", read_only=True
    )
    class Meta:
        model = Review
        fields = (
            "id",
            "user_name",
            "text",
            "rating",
            "created_at",
            "is_approved",
        )
