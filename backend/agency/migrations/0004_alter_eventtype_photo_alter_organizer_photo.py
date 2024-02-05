# Generated by Django 4.1 on 2024-01-04 18:27

import agency.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("agency", "0003_eventtype_photo"),
    ]

    operations = [
        migrations.AlterField(
            model_name="eventtype",
            name="photo",
            field=models.ImageField(upload_to=agency.models.event_type_photo_file_path),
        ),
        migrations.AlterField(
            model_name="organizer",
            name="photo",
            field=models.ImageField(
                upload_to=agency.models.service_presentation_pdf_file_path
            ),
        ),
    ]
