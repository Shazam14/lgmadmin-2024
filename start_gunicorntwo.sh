#!/bin/bash

# Activate Conda environment
source /home/lgmsadmin/anaconda3/bin/activate lgmnew2024

# Set Django environment
export DJANGO_ENV=testing

# Project directories
PROJECTDIR="/home/lgmsadmin/lgmadmin-2024"
BACKENDDIR="$PROJECTDIR/backend"
SOCKFILE="$PROJECTDIR/run/gunicorn.sock"

# Load environment variables from .env.testing
set -a
source "$PROJECTDIR/.env.testing"
set +a

# Change to the backend directory where manage.py is located
cd "$BACKENDDIR"

# Print environment variables for debugging
echo "Environment variables:" > /tmp/gunicorn_debug.log
echo "DJANGO_ENV: $DJANGO_ENV" >> /tmp/gunicorn_debug.log
echo "SECRET_KEY: $SECRET_KEY" >> /tmp/gunicorn_debug.log
echo "Current directory: $(pwd)" >> /tmp/gunicorn_debug.log
printenv >> /tmp/gunicorn_debug.log

# Ensure the run directory exists
mkdir -p "$(dirname "$SOCKFILE")"

# Start Gunicorn
exec gunicorn config.wsgi:application \
  --name lgmadmin-2024 \
  --workers 3 \
  --user lgmsadmin \
  --group lgmsadmin \
  --bind unix:"$SOCKFILE" \
  --log-level debug \
  --chdir "$BACKENDDIR"


