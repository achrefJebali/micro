# Microservices Angular Frontend

This Angular frontend provides a comprehensive user interface for interacting with all microservices in the project.

## Features

* Dashboard with overview of all services
* Complete CRUD operations for:
  * Departments
  * Contracts
  * Teams
  * Formations
  * Resources
  * Universities
* Node Service management and monitoring
* Integration with Keycloak authentication

## Prerequisites

* Node.js (v14+)
* npm (v6+)
* All backend microservices should be running

## Getting Started

1. Install dependencies:
   ```bash
   cd micro-front
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Navigate to `http://localhost:4200/` in your browser

## Connecting to Microservices

This frontend is configured to connect to your microservices through the API Gateway at `http://localhost:8081`. Make sure your backend services are running:

* API Gateway: port 8081
* Department Service: port 8085
* Resource Service: port 8083
* Contract Service: port 8084
* Team Service: port 8082
* Formation Service: port 8086
* University Service: port 8087
* Node Service: port 8090
* Keycloak: port 8080

## Building for Production

Run `ng build` to build the project for production. The build artifacts will be stored in the `dist/` directory.

## Dockerizing the Frontend

To containerize this Angular application, use the included Dockerfile:

```bash
# Build the Docker image
docker build -t micro-front .

# Run the container
docker run -p 4200:80 micro-front
```

## Connecting with Keycloak

This frontend is already set up to authenticate with your Keycloak server running on port 8080. Make sure the Keycloak server is properly configured as described in your `keycloak-readme.md` file.
