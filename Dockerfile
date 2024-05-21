# Use an official Python runtime as a parent image
FROM python:3.11.0

# Install system dependencies
RUN apt-get update && apt-get install -y \
    graphviz-dev \
    pkg-config \
    build-essential \
    curl \
    nginx \
    && curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install global Yarn
RUN npm install -g yarn

# Set the working directory to /app
WORKDIR /app

# Copy and install Python dependencies from the backend
COPY backend/requirements.txt /app/backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Set the working directory to /app/frontend for frontend operations
WORKDIR /app/frontend

# Copy frontend package files and install JavaScript dependencies
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install
RUN yarn add @mui/material @emotion/react @emotion/styled
RUN yarn add --dev @babel/plugin-proposal-private-property-in-object

# Copy the entire frontend directory to ensure all frontend files are included
COPY frontend/ /app/frontend/

# Return to the main app directory
WORKDIR /app

# Copy the backend directory
COPY backend/ /app/backend/

# Prepare directories for static and media files
RUN mkdir -p /app/nginx/static /app/backend/staticfiles /app/backend/media

# Configure Nginx
COPY nginx.conf /etc/nginx/sites-available/default
# Remove any existing default configuration in sites-enabled
RUN rm -f /etc/nginx/sites-enabled/default
# Create a new symbolic link
RUN ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Copy and configure the entrypoint script
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set the entrypoint and default command
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
