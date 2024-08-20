#!/usr/bin/python3
"""The providers view routes"""

from flask import Blueprint, jsonify, request, make_response, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..extensions import db
from ..models.provider import Provider

provider_views = Blueprint("provider_views", __name__, url_prefix="/api/v1/providers")

@provider_views.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_providers():
    providers_data = db.session.query(Provider).all()

    providers = [provider.to_dict() for provider in providers_data]
    data = {
        "message": "All providers retrieved successfully",
        "data": providers,
        "status": "success",
        "status_code": 200
    }
    return make_response(jsonify(data), 200)

@provider_views.route('/<id>', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
def provider(id):
    provider = db.session.query(Provider).filter_by(id=id).one_or_none()
    if not provider:
        abort(404)

    if request.method == 'GET':
        data = {
        "message": f"Provider {provider.email} retrieved successfully",
        "data": provider.to_dict(),
        "status": "success",
        "status_code": 200
        }
        return make_response(jsonify(data), 200)
    
    auth_user = get_jwt_identity()
    if auth_user != id:
        abort(401)
    if request.method == 'PUT':
        body = request.get_json()

        for key, value in body.items():
            setattr(provider, key, value)
        db.session.commit()

        data = {
        "message": f"Provider {provider.email} updated successfully",
        "data": provider.to_dict(),
        "status": "success",
        "status_code": 200
        }
        return make_response(jsonify(data), 200)
    
    if request.method == 'DELETE':
        email = provider.email
        db.session.delete(provider)
        db.session.commit()

        data = {
        "message": f"Provider {email} deleted successfully",
        "status": "success",
        "status_code": 203
        }
        return make_response(jsonify(data), 203)
    
@provider_views.route('/<id>/bookings', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_provider_bookings(id):
    auth_user = get_jwt_identity()
    if auth_user != id:
        abort(401)

    provider = db.session.query(Provider).filter_by(id=id).one_or_none()
    if not provider:
        abort(404)
    bookings = [booking.to_dict() for booking in provider.bookings]

    data = {
        "status": "success",
        "message": f"Provider {provider.email} bookings retrieved successfully",
        "data": bookings,
        "status_code": 200
        }
    return make_response(jsonify(data), 200)

@provider_views.route('/<id>/reviews', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_provider_reviews(id):
    provider = db.session.query(Provider).filter_by(id=id).one_or_none()
    if not provider:
        abort(404)
    reviews = [review.to_dict() for review in provider.reviews]

    data = {
        "status": "success",
        "message": f"Provider {provider.email} reviews retrieved successfully",
        "data": reviews,
        "status_code": 200
        }
    return make_response(jsonify(data), 200)