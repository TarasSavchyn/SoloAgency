# Generated by Django 4.1 on 2024-02-02 19:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("agency", "0023_alter_review_options"),
    ]

    operations = [
        migrations.AlterField(
            model_name="event",
            name="style",
            field=models.CharField(blank=True, max_length=63, null=True),
        ),
    ]
