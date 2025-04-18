from flask import Flask, jsonify, request
import os
import requests
import json
from flask_cors import CORS
import py_eureka_client.eureka_client as eureka_client

app = Flask(__name__)
CORS(app)

# Eureka client configuration
eureka_server = os.environ.get("EUREKA_SERVER", "http://localhost:8761/eureka/")
app_name = "notification-service"
instance_port = 5000

# Setup Eureka client
try:
    eureka_client.init(
        eureka_server=eureka_server,
        app_name=app_name,
        instance_port=instance_port,
        instance_ip="127.0.0.1"
    )
    print("Connected to Eureka Server")
except Exception as e:
    print(f"Failed to connect to Eureka: {e}")

# Keycloak configuration
keycloak_url = os.environ.get("KEYCLOAK_URL", "http://localhost:8080")
keycloak_realm = os.environ.get("KEYCLOAK_REALM", "kassil-realm")
keycloak_client_id = os.environ.get("KEYCLOAK_CLIENT_ID", "notification-service")
keycloak_client_secret = os.environ.get("KEYCLOAK_CLIENT_SECRET", "your-client-secret")

def get_token():
    token_url = f"{keycloak_url}/realms/{keycloak_realm}/protocol/openid-connect/token"
    payload = {
        'grant_type': 'client_credentials',
        'client_id': keycloak_client_id,
        'client_secret': keycloak_client_secret
    }
    try:
        response = requests.post(token_url, data=payload)
        if response.status_code == 200:
            return response.json().get('access_token')
        else:
            print(f"Error getting token: {response.text}")
            return None
    except Exception as e:
        print(f"Exception when getting token: {e}")
        return None

def verify_token(token):
    if not token:
        return False
    
    introspect_url = f"{keycloak_url}/realms/{keycloak_realm}/protocol/openid-connect/token/introspect"
    payload = {
        'token': token,
        'client_id': keycloak_client_id,
        'client_secret': keycloak_client_secret
    }
    try:
        response = requests.post(introspect_url, data=payload)
        if response.status_code == 200:
            result = response.json()
            return result.get('active', False)
        return False
    except Exception:
        return False

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "UP"})

@app.route('/notifications', methods=['GET'])
def get_notifications():
    # Authentication check
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({"error": "Missing or invalid authorization token"}), 401
    
    token = auth_header.split(' ')[1]
    if not verify_token(token):
        return jsonify({"error": "Invalid or expired token"}), 401
    
    # User ID from query parameter
    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    
    # Mock data for demonstration
    notifications = [
        {
            "id": 1,
            "userId": user_id,
            "message": "Your team meeting has been scheduled",
            "timestamp": "2025-04-18T10:30:00",
            "read": False
        },
        {
            "id": 2,
            "userId": user_id,
            "message": "New resource available for your project",
            "timestamp": "2025-04-17T14:15:00",
            "read": True
        }
    ]
    
    return jsonify(notifications)

@app.route('/notifications', methods=['POST'])
def create_notification():
    # Authentication check
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({"error": "Missing or invalid authorization token"}), 401
    
    token = auth_header.split(' ')[1]
    if not verify_token(token):
        return jsonify({"error": "Invalid or expired token"}), 401
    
    data = request.json
    if not data or 'userId' not in data or 'message' not in data:
        return jsonify({"error": "User ID and message are required"}), 400
    
    # In a real implementation, we would save this to a database
    # Here, we just return a success response with the notification
    notification = {
        "id": 3,  # In a real implementation, this would be generated
        "userId": data['userId'],
        "message": data['message'],
        "timestamp": "2025-04-18T12:00:00",  # In a real implementation, this would be current time
        "read": False
    }
    
    return jsonify(notification), 201

@app.route('/notifications/mark-read/<int:notification_id>', methods=['PUT'])
def mark_notification_read(notification_id):
    # Authentication check
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({"error": "Missing or invalid authorization token"}), 401
    
    token = auth_header.split(' ')[1]
    if not verify_token(token):
        return jsonify({"error": "Invalid or expired token"}), 401
    
    # In a real implementation, we would update the database
    # Here, we just return a success response
    return jsonify({"success": True, "message": f"Notification {notification_id} marked as read"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
