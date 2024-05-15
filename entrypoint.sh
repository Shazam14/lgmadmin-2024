#!/bin/bash

# Check if PostgreSQL container is running
if ! docker ps --format '{{.Names}}' | grep -q postgres; then
  echo "PostgreSQL container is not running. Please start the container and try again."
  exit 1
fi

# Get the IP address of the PostgreSQL container
DB_HOST=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres)

# Update the backend .env file with the PostgreSQL container's IP address
sed -i "s/DB_HOST=localhost/DB_HOST=$DB_HOST/" ./backend/.env

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Start the main process
exec "$@"


# Execute the command
exec "$@"