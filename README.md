# Microservices Architecture Project (Back-Equipe)

## Objectifs Techniques Validés

✅ **Intégration du serveur de configuration**
- Mise en place de Spring Cloud Config Server
- Configuration des microservices pour récupérer leur configuration depuis le serveur
- Gestion des propriétés centralisée

✅ **Dockerisation de l'application**
- Création de Dockerfile pour chaque microservice
- Configuration du docker-compose.yml pour orchestrer tous les services
- Isolation et portabilité de l'environnement de développement

✅ **Intégration d'Eureka Server**
- Mise en place du service discovery
- Enregistrement automatique des microservices
- Résolution dynamique des adresses des services

✅ **Configuration de l'API Gateway**
- Routage intelligent vers les microservices
- Point d'entrée unique pour les clients
- Sécurisation centralisée des endpoints

✅ **Gestion des utilisateurs avec Keycloak**
- Authentification OAuth2/OpenID Connect
- Autorisation basée sur les rôles
- Sécurisation des endpoints des microservices

✅ **Microservice additionnel (Python/Flask)**
- Développement d'un service de notification en Python
- Intégration avec l'écosystème Spring Boot
- Démonstration de l'architecture polyglotte

## Structure du Projet

```
Back-Equipe/
├── src/                           # Code source du microservice principal
│   ├── main/java/tn/esprit/microservice/kassil/
│   │   ├── Controller/            # Contrôleurs REST
│   │   ├── entities/              # Entités JPA
│   │   ├── repositories/          # Repositories Spring Data
│   │   ├── services/              # Services métier
│   │   ├── config/                # Configuration Spring
│   │   └── KassilApplication.java # Point d'entrée de l'application
│   └── main/resources/            # Fichiers de configuration
├── notification-service/          # Microservice Python
│   ├── app.py                     # Application Flask
│   ├── requirements.txt           # Dépendances Python
│   └── Dockerfile                 # Configuration Docker
├── docker-compose.yml             # Orchestration des services
├── Dockerfile                     # Configuration Docker du service principal
└── README.md                      # Documentation principale
```

## Étapes de Déploiement

### Prérequis

- Docker et Docker Compose
- Java 17
- Maven 3.6+
- Python 3.8+ (pour le service de notification)

### 1. Cloner le dépôt

```bash
git clone <repository-url>
cd Back-Equipe
```

### 2. Construire et démarrer les services

```bash
# Construire et démarrer tous les services
docker-compose up -d
```

### 3. Vérifier le déploiement

Accédez aux différentes interfaces:

- **Config Server**: http://localhost:8888
- **Eureka Server**: http://localhost:8761
- **API Gateway**: http://localhost:8090
- **Kassil Service**: http://localhost:8089/kassil
- **Notification Service**: http://localhost:5000
- **Keycloak**: http://localhost:8080

## Architecture Technique

![Architecture Microservices](https://miro.medium.com/max/1400/1*QzP9CSXLp4tqRRXlmfABLg.png)

### Intégration des Composants

1. **Config Server**
   - Centralise la configuration de tous les microservices
   - Supporte les profils d'environnement (dev, test, prod)
   - Permet la mise à jour dynamique des configurations

2. **Eureka Server**
   - Registre de services pour la découverte dynamique
   - Monitoring de l'état des services
   - Équilibrage de charge automatique

3. **API Gateway**
   - Routage intelligent vers les microservices appropriés
   - Filtrage des requêtes et réponses
   - Sécurité centralisée avec Keycloak

4. **Keycloak**
   - Gestion centralisée des utilisateurs et des rôles
   - Authentification OAuth2/OpenID Connect
   - Single Sign-On (SSO) pour tous les microservices

## Microservices

Chaque microservice dispose de sa propre documentation détaillée:

- [Kassil Service Documentation](./kassil-service-README.md) - Service principal en Spring Boot
- [Notification Service Documentation](./notification-service/README.md) - Service de notification en Python/Flask
- [Keycloak Configuration Guide](./keycloak-README.md) - Guide d'intégration de Keycloak

## Technologies Utilisées

- **Backend Principal**: Spring Boot 3.4.2, Spring Cloud 2024.0.0
- **Base de Données**: H2 (en mémoire)
- **Service Discovery**: Netflix Eureka
- **API Gateway**: Spring Cloud Gateway
- **Configuration**: Spring Cloud Config
- **Sécurité**: Keycloak, Spring Security, OAuth2
- **Microservice Additionnel**: Python 3.9, Flask
- **Conteneurisation**: Docker, Docker Compose
