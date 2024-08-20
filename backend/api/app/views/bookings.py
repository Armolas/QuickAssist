#!/usr/bin/python3
"""The services view routes"""

from datetime import datetime
from flask import Blueprint, jsonify, request, make_response, abort
from flask_jwt_extended import jwt_required
from ..extensions import db
from ..models.booking import Booking
from ..models.service import Service

booking_views = Blueprint("booking_views", __name__, url_prefix="/api/v1/bookings")

@booking_views.route('/', methods=['GET', 'POST'], strict_slashes=False)
@jwt_required()
def bookings():
    if request.method == 'GET':

        bookings_data = db.session.query(Booking).all()

        bookings = [booking.to_dict() for booking in bookings_data]
        data = {
            "message": "All bookings retrieved successfully",
            "data": bookings,
            "status": "success",
            "status_code": 200
        }
        return make_response(jsonify(data), 200)
    
    if request.method == 'POST':
        body = request.get_json()

        booking_data = ["date", "service", "user_id", "provider_id", "description", "status"]

        for data in booking_data:
            if data not in body and data not in ["status", "description"]:
                return make_response(jsonify({"error": f"Missing required {data}"}), 400)
        construct_data = {}
        date = body['date']
        service = db.session.query(Service).filter_by(name=body['service']).one_or_none()
        if not service:
            return make_response(jsonify({"error": "Service not found"}), 404)
        for key, value in body.items():
            if key not in booking_data:
                return make_response(jsonify({"error": "Invalid data, Bad request"}), 400)
            construct_data[key] = value
        if service:
            del construct_data['service']
            construct_data['service_id'] = service.id
        construct_data['date'] = datetime.strptime(date, "%Y-%m-%dT%H:%M")
        booking = Booking(**construct_data)
        db.session.add(booking)
        db.session.commit()

        data = {
            "message": "Booking created successfully",
            "data": booking.to_dict(),
            "status": 'success',
            "status_code": 201
        }
        return make_response(jsonify(data), 201)
    
@booking_views.route('/<id>', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
def booking(id):
    booking = db.session.query(Booking).filter_by(id=id).one_or_none()
    if not booking:
        abort(404)

    if request.method == 'GET':
        data = {
        "message": "Booking retrieved successfully",
        "data": booking.to_dict(),
        "status": "success",
        "status_code": 200
        }
        return make_response(jsonify(data), 200)
    
    if request.method == 'PUT':
        body = request.get_json()

        for key, value in body.items():
            if key == 'date':
                value = datetime.strptime(value, "%Y-%m-%dT%H:%M")
            setattr(booking, key, value)
        db.session.commit()

        data = {
        "message": "Booking updated successfully",
        "data": booking.to_dict(),
        "status": "success",
        "status_code": 200
        }
        return make_response(jsonify(data), 200)
    
    if request.method == 'DELETE':
        db.session.delete(booking)
        db.session.commit()

        data = {
        "message": f"Booking deleted successfully",
        "status": "success",
        "status_code": 203
        }
        return make_response(jsonify(data), 203)