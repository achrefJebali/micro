# MICROSERVICE RESSOURCE – SPRING BOOT

Microservice pour la gestion des ressources pédagogiques avec statistiques par type, upload de fichiers PDF, classification par type, et génération de résumé.

## Description
This microservice manages educational resource-related operations within the system.

## Technology Stack
- Java 17
- Spring Boot 3.4.2
- Spring Data JPA
- Lombok
- MultipartFile
- MySQL
- OpenPDF / PDFBox (résumé PDF)
- Maven

## Endpoints
- `GET /api/contrat` : Get all contracts
- `GET /api/contrat/{id}` : Get contract by ID
- `POST /api/contrat` : Create a new contract
- `PUT /api/contrat/{id}` : Update a contract
- `DELETE /api/contrat/{id}` : Delete a contract

## Configuration
- Service registers with Eureka at startup
- Uses centralized config server (if available)
- Environment variables:
  - `SERVER_PORT`: Port to run the service (default: 8084)
  - `EUREKA_CLIENT_SERVICEURL_DEFAULTZONE`: Eureka server URL

## Running the Service
### Locally
```bash
./mvnw spring-boot:run
```

### With Docker
```bash
docker build -t micro-ressource .
docker run -p 8084:8084 micro-ressource
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

## FONCTIONNALITÉS PRINCIPALES

- Ajouter une ressource avec un fichier PDF
- Récupérer / modifier / supprimer des ressources
- Statistiques par type de ressource
- Résumé automatique du fichier PDF

## TECHNOLOGIES UTILISÉES

- **Spring Boot**, **Spring Data JPA**
- **Lombok**, **MultipartFile**
- **MySQL**
- **OpenPDF** / **PDFBox** (résumé PDF)

## POINTS AJOUTÉS

- **Tests unitaires** : Tests utilisant **JUnit** et **Mockito** pour le résumé du PDF.
- **Dockerisation**
- **Logs et journalisation**
