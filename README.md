# Microservices Project - Final Delivery

## Overview
This repository contains a microservices-based application for the final module project. It includes several backend services, an API Gateway, Eureka server, and integration with Keycloak for authentication and authorization.

## Structure
- **Back-Equipe**: Team management microservice (Spring Boot)
- **Back-Ressource**: Resource management microservice (Spring Boot)
- **Back-apigetway**: API Gateway (Spring Cloud Gateway)
- **Back-contrat.1.1**: Contract management microservice (Spring Boot)
- **Back-departement1.1**: Department management microservice (Spring Boot)
- **Back-eurika**: Eureka service registry (Spring Cloud Eureka)
- **Back-formation**: Training management microservice (Spring Boot)
- **Back-gatewayedit**: Gateway variant (Spring Boot)
- **Back-houssemGateway**: Gateway variant (Spring Boot)
- **Back-ressource1.1**: Resource management variant (Spring Boot)
- **Back-university1.1**: University management microservice (Spring Boot)
- **Back-withoutkeyclock**: Service variant without Keycloak integration
- **Database**: Database scripts or data

## Deployment
All services are dockerized. To run the full stack, use the provided `docker-compose.yml` (to be created) at the project root. Example:

```bash
docker-compose up --build
```

## Keycloak Integration
Keycloak is used for user authentication and authorization. See the Keycloak section below for setup and integration details.

## Additional Microservice
A microservice must be implemented in a different technology than Java/Spring Boot (e.g., Node.js, Python, Go). Ensure it is present, documented, and justified.

---

# Keycloak Integration

## Setup
1. Launch Keycloak using Docker:
   ```bash
   docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev
   ```
2. Create a realm, client, and users as required.
3. Configure each microservice to use Keycloak for authentication (see each service's README for details).

## Testing
- Access the API Gateway and protected endpoints using a Keycloak-issued token.
- Refer to the documentation in `Back-Ressource/upload-dir/` for a PDF guide on securing the API Gateway with Keycloak.

---

# Documentation
- Each microservice contains a `README.md` with its purpose, configuration, and run instructions.
- This main README provides an overview and deployment steps.

# Authors
- [Your Team Names Here]

# License
- [Your License Here]
