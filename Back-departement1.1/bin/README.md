# Back-departement Microservice

## Description
This microservice manages department-related operations within the system.

## Technology Stack
- Java 17
- Spring Boot 3.4.2
- Spring Cloud
- Maven

## Endpoints
- `GET /api/departement` : Get all departments
- `GET /api/departement/{id}` : Get department by ID
- `POST /api/departement` : Create a new department
- `PUT /api/departement/{id}` : Update a department
- `DELETE /api/departement/{id}` : Delete a department

## Configuration
- Service registers with Eureka at startup
- Uses centralized config server (if available)
- Environment variables:
  - `SERVER_PORT`: Port to run the service (default: 8085)
  - `EUREKA_CLIENT_SERVICEURL_DEFAULTZONE`: Eureka server URL

## Running the Service
### Locally
```bash
./mvnw spring-boot:run
```

### With Docker
```bash
docker build -t back-departement .
docker run -p 8085:8085 back-departement
```

## Integration
- Secured with Keycloak (see main project README for setup)
- Communicates with other microservices via REST

### Keycloak Configuration Example
Add the following to your `application.yml`:

```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: http://localhost:8080/realms/your-realm
```

# In your controller/service, use @PreAuthorize or @RolesAllowed for endpoint protection.

## Authors
- [Your Team Names Here]

Microservice pour la gestion des departement  avec statistique par date , recherche et tri.

Fonctionnalités principales
Ajouter un departement 
Récupérer / modifier / supprimer des departements
Statistiques par date de departement
recherche et tri des departements
Technologies utilisées
Spring Boot, Spring Data JPA
Lombok
MySQL

Points ajoutés :
** Dockerisation
