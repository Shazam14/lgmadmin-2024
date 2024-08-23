#!/bin/bash
source /home/lgmsadmin/anaconda3/bin/activate lgmnew2024
cd /home/lgmsadmin/lgmadmin-2024/backend
export DJANGO_SETTINGS_MODULE=config.settings
gunicorn config.wsgi:application --bind 127.0.0.1:8004