# Generated by Django 4.1 on 2024-02-07 17:14

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("agency", "0026_remove_organizer_photo_service_presentation"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="event",
            name="venue",
        ),
        migrations.AlterField(
            model_name="event",
            name="date",
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="event",
            name="description",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="event",
            name="number_of_guests",
            field=models.IntegerField(
                blank=True,
                null=True,
                validators=[
                    django.core.validators.MinValueValidator(1),
                    django.core.validators.MaxValueValidator(999999),
                ],
            ),
        ),
    ]
