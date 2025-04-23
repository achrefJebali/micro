# Keycloak Integration Guide

This guide explains how to set up and configure Keycloak for authentication and authorization in our microservices architecture.

## Prerequisites

- Docker and Docker Compose installed
- Microservices project cloned and built

## Starting Keycloak

1. Start Keycloak using Docker Compose:
   ```bash
   docker-compose up -d keycloak
   ```

2. Access the Keycloak Admin Console:
   - URL: http://localhost:8080/
   - Username: admin
   - Password: admin

## Setting Up Keycloak Realm and Client

### Create a New Realm

1. Log in to the Keycloak Admin Console
2. Hover over the realm dropdown in the top-left corner and click "Create Realm"
3. Enter "microservices-realm" as the realm name and click "Create"

### Create a Client

1. In your new realm, go to "Clients" in the left sidebar
2. Click "Create client"
3. Set the following values:
   - Client ID: microservices-client
   - Client Protocol: openid-connect
   - Click "Next"
4. On the Capability Config screen:
   - Enable "Client authentication"
   - Enable "Authorization"
   - Enable "Standard flow" (for authorization code flow)
   - Click "Next"
5. On the Login Settings screen:
   - Valid redirect URIs: http://localhost:8081/*
   - Web Origins: *
   - Click "Save"

### Get Client Secret

1. After creating the client, go to its "Credentials" tab
2. Copy the "Client secret" value
3. Update this value in your application.properties files:
   ```properties
   spring.security.oauth2.client.registration.keycloak.client-secret=your-copied-secret
   ```

### Create Roles

1. Go to "Realm roles" in the left sidebar
2. Click "Create role"
3. Create roles like "user" and "admin"
4. Assign these roles to users

### Create Users

1. Go to "Users" in the left sidebar
2. Click "Add user"
3. Fill in the user details and click "Create"
4. Go to the "Credentials" tab for the new user and set a password
5. Go to the "Role mappings" tab and assign appropriate roles

## Testing the Integration

1. Start all your microservices:
   ```bash
   docker-compose up -d
   ```

2. Try to access a secure endpoint, e.g., http://localhost:8081/contrats
   - You should be redirected to the Keycloak login page
   - After successful login, you'll be redirected back to your application

## Troubleshooting

- If you encounter CORS issues, ensure your Web Origins are properly configured
- Check client credentials and URLs for typos
- Verify that your microservices are correctly configured with the Spring Security dependencies

## Security Considerations for Production

- Use HTTPS for all communications
- Set secure and strict password policies
- Limit token lifetimes
- Use a production-ready database for Keycloak
- Set up proper logging and monitoring
