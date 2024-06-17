#!/bin/bash

# List of your apps
apps=("applicants" "courses" "enrollments" "grades" "gradesystem" "parents" "students" "teachers" "tuition_management")

for app in "${apps[@]}"
do
    mkdir -p backend/apps/$app/migrations
    touch backend/apps/$app/migrations/__init__.py
    echo "Created migrations folder and __init__.py for $app"
done
