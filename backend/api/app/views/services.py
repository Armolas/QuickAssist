#!/usr/bin/python3
"""The services view routes"""

from flask import Blueprint, jsonify, request, make_response, abort
from ..extensions import db
from ..models.service import Service

service_views = Blueprint("service_views", __name__, url_prefix="/api/v1/services")

@service_views.route('/', methods=['GET', 'POST'], strict_slashes=False)
def services():
    if request.method == 'GET':
        services_data = db.session.query(Service).all()

        services = [service.to_dict() for service in services_data]
        data = {
            "message": "All services retrieved successfully",
            "data": services,
            "status": "success",
            "status_code": 200
        }
        return make_response(jsonify(data), 200)
    
    if request.method == 'POST':
        body = request.get_json()

        service_data = ["name", "description"]

        for data in service_data:
            if data not in body:
                return make_response(jsonify({"error": f"Missing {data}"}), 400)
        construct_data = {}

        for key, value in body.items():
            if key not in service_data:
                return make_response(jsonify({"error": "Invalid data, Bad request"}), 400)
            construct_data[key] = value

        service = Service(**construct_data)
        db.session.add(service)
        db.session.commit()

        data = {
            "message": "Service created successfully",
            "data": service.to_dict(),
            "status": 'success',
            "status_code": 201
        }
        return make_response(jsonify(data), 201)
    
@service_views.route('/<id>', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
def service(id):
    service = db.session.query(Service).filter_by(id=id).one_or_none()
    if not service:
        abort(404)

    if request.method == 'GET':
        data = {
        "message": f"Service {service.name} retrieved successfully",
        "data": service.to_dict(),
        "status": "success",
        "status_code": 200
        }
        return make_response(jsonify(data), 200)
    
    if request.method == 'PUT':
        body = request.get_json()

        for key, value in body.items():
            setattr(service, key, value)
        db.session.commit()

        data = {
        "message": f"Service {service.name} updated successfully",
        "data": service.to_dict(),
        "status": "success",
        "status_code": 200
        }
        return make_response(jsonify(data), 200)
    
    if request.method == 'DELETE':
        name = service.name
        db.session.delete(service)
        db.session.commit()

        data = {
        "message": f"Service {name} deleted successfully",
        "status": "success",
        "status_code": 203
        }
        return make_response(jsonify(data), 203)
    
@service_views.route('/<id>/providers', methods=['GET'], strict_slashes=False)
def get_service_providers(id):
    service = db.session.query(Service).filter_by(id=id).one_or_none()
    if not service:
        abort(404)

    data = {
        "message": f"service {service.name} providers retrieved successfully",
        "status": "success",
        "service": service.name,
        "data": service.providers_list(),
        "status_code": 200
    }
    return make_response(jsonify(data), 200)