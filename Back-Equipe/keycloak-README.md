# Keycloak Integration Guide

## Overview

This document explains how Keycloak is integrated into our microservices architecture for centralized authentication and authorization.

## Keycloak Setup

### Installation

Keycloak is deployed as a containerized service within our Docker Compose environment. The setup includes:

- Keycloak Server (version 21.1.1)
- PostgreSQL database for Keycloak data persistence

### Initial Configuration

1. **Access Keycloak Admin Console**: 
   - URL: http://localhost:8080/admin
   - Default credentials: admin/admin

2. **Create a New Realm**:
   - Name: `kassil-realm`
   - Enable: `True`

3. **Create Clients**:
   - Client ID: `kassil-service`
     - Access Type: `confidential`
     - Service Accounts Enabled: `True`
     - Valid Redirect URIs: `http://localhost:8089/*`
     - Web Origins: `+` (allow all)
   
   - Client ID: `gateway-service`
     - Access Type: `confidential`
     - Service Accounts Enabled: `True`
     - Valid Redirect URIs: `http://localhost:8090/*`
     - Web Origins: `+` (allow all)
   
   - Client ID: `notification-service`
     - Access Type: `confidential`
     - Service Accounts Enabled: `True`
     - Valid Redirect URIs: `http://localhost:5000/*`
     - Web Origins: `+` (allow all)

4. **Create Roles**:
   - `admin`: Full system access
   - `user`: Regular user access
   - `manager`: Management functionality

5. **Create Users**:
   - Create test users and assign appropriate roles

## Integration with Microservices

### Spring Boot Services (Kassil Service and API Gateway)

1. **Dependencies**:
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-security</artifactId>
   </dependency>
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
   </dependency>
   <dependency>
       <groupId>org.springframework.security</groupId>
       <artifactId>spring-security-oauth2-jose</artifactId>
   </dependency>
   ```

2. **Configuration**:
   ```properties
   spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:8080/realms/kassil-realm
   spring.security.oauth2.resourceserver.jwt.jwk-set-uri=http://localhost:8080/realms/kassil-realm/protocol/openid-connect/certs
   ```

3. **Security Configuration**:
   - Each service has a `SecurityConfig` class that configures Spring Security to validate JWT tokens issued by Keycloak.
   - Role-based access control is implemented using the `@PreAuthorize` annotation.

### Python Service (Notification Service)

1. **Dependencies**:
   - Requests library for HTTP communication with Keycloak

2. **Token Validation**:
   - The service implements a custom token validation mechanism using Keycloak's token introspection endpoint.

## Authentication Flows

1. **Resource Owner Password Flow**:
   - Used for direct username/password authentication from client applications

2. **Client Credentials Flow**:
   - Used for service-to-service communication

3. **Authorization Code Flow**:
   - Used for web applications with a frontend

## Securing Endpoints

All microservices implement endpoint security using Keycloak:

1. **Public Endpoints**:
   - Health check: `/actuator/health`
   - Info: `/actuator/info`
   - Swagger UI: `/swagger-ui/**`

2. **Protected Endpoints**:
   - All API endpoints require valid JWT token
   - Role-based access control for specific endpoints

## Testing Keycloak Integration

1. **Get a Token**:
   ```bash
   curl -X POST \
     http://localhost:8080/realms/kassil-realm/protocol/openid-connect/token \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     -d 'grant_type=password&client_id=kassil-service&client_secret=YOUR_CLIENT_SECRET&username=admin&password=admin'
   ```

2. **Use the Token**:
   ```bash
   curl -X GET \
     http://localhost:8089/kassil/api/resource \
     -H 'Authorization: Bearer YOUR_TOKEN'
   ```

## Troubleshooting

1. **Invalid Token Issues**:
   - Verify token expiration
   - Check if the realm and client are correctly configured
   - Ensure the client secret is correct

2. **Role Mapping Issues**:
   - Verify the role mappings in Keycloak
   - Check if the roles are correctly assigned to users
   - Ensure the role claim contains the expected roles

3. **CORS Issues**:
   - Configure Web Origins in Keycloak client settings
   - Ensure CORS is properly configured in the microservices
