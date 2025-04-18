# Notification Service

## Overview

The Notification Service is an additional microservice built with Python and Flask. It demonstrates the polyglot nature of our microservices architecture by using a different technology stack than the core services.

## Technology Choice Justification

Python was chosen for this microservice for the following reasons:

1. **Real-time capabilities**: Python's asynchronous capabilities with libraries like Flask make it well-suited for a notification service that requires real-time updates.

2. **Simplified development**: Python allows for rapid development of microservices with minimal boilerplate code.

3. **Rich ecosystem**: Python has a robust ecosystem for handling notifications, including libraries for email, push notifications, and websockets.

4. **Performance efficiency**: For notification services that don't require heavy computational resources, Python provides adequate performance while using fewer system resources.

5. **Integration capabilities**: Python's extensive libraries make it easy to integrate with message brokers, databases, and other services.

## Technical Details

### Dependencies

- Python 3.8+
- Flask
- Flask-CORS
- Requests
- py-eureka-client

### API Endpoints

- `GET /health`: Health check endpoint (public)
- `GET /notifications?userId={id}`: Get notifications for a specific user
- `POST /notifications`: Create a new notification
- `PUT /notifications/mark-read/{id}`: Mark a notification as read

## Setup and Installation

### Prerequisites

- Python 3.8+
- pip

### Installation

```bash
cd notification-service
pip install -r requirements.txt
python app.py
```

### Docker Deployment

```bash
docker build -t notification-service .
docker run -p 5000:5000 notification-service
```

## Environment Variables

The following environment variables can be configured:

- `EUREKA_SERVER`: URL to the Eureka Server (default: http://localhost:8761/eureka/)
- `KEYCLOAK_URL`: URL to the Keycloak Server (default: http://localhost:8080)
- `KEYCLOAK_REALM`: Keycloak realm name (default: kassil-realm)
- `KEYCLOAK_CLIENT_ID`: Keycloak client ID (default: notification-service)
- `KEYCLOAK_CLIENT_SECRET`: Keycloak client secret

## Integration with Other Services

- **Eureka Server**: Registers itself for service discovery
- **Keycloak**: Uses Keycloak for authentication and authorization

## Security

The service is secured with Keycloak integration, validating JWT tokens for all protected endpoints. The security implementation includes:

- Token validation
- Client credentials flow for service-to-service communication
- Protection for all notification endpoints
