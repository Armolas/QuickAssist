#!/usr/bin/python3
"""The users view routes"""

from flask import Blueprint, jsonify, request, make_response, abort
from flask_jwt_extended import get_jwt_identity, jwt_required
from ..extensions import db
from ..models.user import User

user_views = Blueprint("user_views", __name__, url_prefix="/api/v1/users")

@user_views.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_users():
    users = []
    users_data = db.session.query(User).all()

    for user in users_data:
        user_data = user.to_dict()
        users.append(user_data)
    data = {
        "status": "success",
        "message": "All users generated successfully",
        "data": users,
        "status_code": 200
    }
    return make_response(jsonify(data), 200)

@user_views.route('/<id>', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
def user(id):
    auth_user = get_jwt_identity()
    if auth_user != id:
        abort(401)
    user = db.session.query(User).filter_by(id=id).one_or_none()
    if not user:
        abort(404)
    
    if request.method == 'GET':
        user_data = user.to_dict()
        data = {
        "status": "success",
        "message": f"User {user.email} generated successfully",
        "data": user_data,
        "status_code": 200
        }
        return make_response(jsonify(data), 200)
    
    if request.method == 'PUT':
        body = request.get_json()

        for key, value in body.items():
            setattr(user, key, value)
        db.session.commit()
        user_data = user.to_dict()
        data = {
        "status": "success",
        "message": f"User {user.email} updated successfully",
        "data": user_data,
        "status_code": 200
        }
        return make_response(jsonify(data), 200)
    
    if request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        data = {
        "status": "success",
        "message": "User deleted successfully",
        "status_code": 203
        }
        return make_response(jsonify(data), 203)

@user_views.route('/<id>/bookings', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_user_bookings(id):
    auth_user = get_jwt_identity()
    if auth_user != id:
        abort(401)
        
    user = db.session.query(User).filter_by(id=id).one_or_none()
    if not user:
        abort(404)
    
    bookings = [booking.to_dict() for booking in user.bookings]

    data = {
        "status": "success",
        "message": f"User {user.email} bookings retrieved successfully",
        "data": bookings,
        "status_code": 200
        }
    return make_response(jsonify(data), 200)