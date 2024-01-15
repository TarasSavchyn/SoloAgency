# Generated by Django 4.1 on 2024-01-15 18:20

import agency.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("agency", "0019_alter_advice_options"),
    ]

    operations = [
        migrations.CreateModel(
            name="Portfolio",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "photo",
                    models.ImageField(
                        upload_to=agency.models.portfolio_photo_file_path
                    ),
                ),
                ("description", models.TextField(max_length=1023)),
                ("title", models.CharField(max_length=120)),
            ],
        ),
    ]