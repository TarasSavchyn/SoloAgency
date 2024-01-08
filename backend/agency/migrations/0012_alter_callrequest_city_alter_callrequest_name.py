# Generated by Django 4.1 on 2024-01-08 21:24

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("agency", "0011_event_service"),
    ]

    operations = [
        migrations.AlterField(
            model_name="callrequest",
            name="city",
            field=models.CharField(
                blank=True,
                max_length=63,
                null=True,
                validators=[
                    django.core.validators.RegexValidator(
                        message="Word must contain only letters.", regex="^[a-zA-Z]+$"
                    )
                ],
            ),
        ),
        migrations.AlterField(
            model_name="callrequest",
            name="name",
            field=models.CharField(
                max_length=63,
                validators=[
                    django.core.validators.RegexValidator(
                        message="Word must contain only letters.", regex="^[a-zA-Z]+$"
                    )
                ],
            ),
        ),
    ]