# Spring Cloud Config Server

This service provides centralized configuration for all microservices.

## Running
### Locally
```bash
./mvnw spring-boot:run
```

### With Docker
```bash
docker build -t config-server .
docker run -p 8888:8888 config-server
```

## Configuration
- By default, it fetches configuration from a remote Git repository.
- Update `application.yml` with your configuration repository URL.
