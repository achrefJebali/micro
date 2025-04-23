# Node.js Microservice

This is a sample Node.js microservice for demonstration and integration with the existing Java/Spring Boot microservices.

## Endpoints
- `GET /api/node/hello`: Returns a hello message from Node.js.

## Running
### Locally
```bash
npm install
npm start
```

### With Docker
```bash
docker build -t back-node-service .
docker run -p 8090:8090 back-node-service
```

## Why Node.js?
Node.js is chosen to demonstrate polyglot microservices and asynchronous, event-driven architecture.
