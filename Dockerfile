# Use an official Python runtime as the base image
FROM python:3.11.0

# Set the working directory in the container
WORKDIR /app

# Copy the backend files to the working directory
COPY lgmadmin/backend/ .

# Install the backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Node.js and npm
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Copy the frontend files to the working directory
COPY lgmadmin/frontend/ ./frontend/

# Change to the frontend directory
WORKDIR /app/frontend

# Install the frontend dependencies using Yarn
RUN npm install --global yarn
RUN yarn install

# Build the React app using Yarn
RUN yarn build

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Remove the default Nginx configuration file
RUN rm /etc/nginx/sites-available/default

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/sites-available/default

# Change back to the root directory
WORKDIR /app

# Copy the .env.example files as a fallback
COPY .env.example ./backend/.env
COPY lgmadmin/frontend/.env.example ./frontend/.env

# Ensure the .env file uses localhost for PostgreSQL
RUN sed -i "s/DB_HOST=your_database_host/DB_HOST=localhost/" ./backend/.env

# Expose the ports for the backend and frontend
EXPOSE 80 8000

# Set up entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Specify the command to run the Nginx server and Django server
CMD ["sh", "-c", "service nginx start && python manage.py runserver 0.0.0.0:8000"]
