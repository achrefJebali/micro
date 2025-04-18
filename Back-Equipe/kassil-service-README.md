# Kassil Service

## Overview

The Kassil Service is a core microservice in our architecture, built with Spring Boot. It provides the main business functionality of the application and integrates with other services through the service discovery mechanism.

## Configuration

The Kassil service is configured to work with:

- **H2 Database**: In-memory database for development and testing
- **Eureka Client**: For service registration and discovery
- **Config Client**: For centralized configuration
- **OAuth2 Resource Server**: For authentication and authorization via Keycloak

## Technical Details

### Dependencies

- Spring Boot 3.4.2
- Spring Cloud 2024.0.0
- Spring Security with OAuth2 Resource Server
- Spring Data JPA
- H2 Database
- Spring Cloud Config Client
- Spring Cloud Netflix Eureka Client

### Database Schema

The service uses an H2 in-memory database with JPA for persistence. The database can be accessed for development via the H2 console at `/h2-console`.

### API Endpoints

All endpoints are secured and require a valid JWT token from Keycloak unless explicitly marked as public.

#### Main Endpoints

- `GET /kassil/api/...`: Various API endpoints for the service functionality
- `GET /kassil/actuator/health`: Health check endpoint (public)
- `GET /kassil/actuator/info`: Service information endpoint (public)

## Running the Service

### Standalone Mode

```bash
mvn spring-boot:run
```

### With Docker

```bash
docker build -t kassil-service .
docker run -p 8089:8089 kassil-service
```

### Environment Variables

When deploying, the following environment variables can be configured:

- `SPRING_CLOUD_CONFIG_URI`: URL to the Config Server
- `EUREKA_CLIENT_SERVICEURL_DEFAULTZONE`: URL to the Eureka Server
- `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_ISSUER_URI`: URL to the Keycloak Server

## Security Configuration

The Kassil service is configured as an OAuth2 Resource Server, validating JWT tokens issued by Keycloak. The security configuration includes:

- JWT token validation
- Role-based authorization
- CORS configuration
- Secured endpoints

## Integration with Other Services

- **Config Server**: Retrieves configuration properties
- **Eureka Server**: Registers itself for discovery
- **API Gateway**: Exposed through the gateway
- **Keycloak**: Uses Keycloak for authentication and authorization
