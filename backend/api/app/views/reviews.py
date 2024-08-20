#!/usr/bin/python3
"""The reviews view routes"""

from flask import Blueprint, jsonify, request, make_response, abort
from flask_jwt_extended import jwt_required
from ..extensions import db
from ..models.review import Review
from .. models.provider import Provider

review_views = Blueprint("review_views", __name__, url_prefix="/api/v1/reviews")

@review_views.route('/', methods=['GET', 'POST'], strict_slashes=False)
@jwt_required()
def reviews():
    if request.method == 'GET':
        reviews_data = db.session.query(Review).all()

        reviews = [review.to_dict() for review in reviews_data]
        data = {
            "message": "All reviews retrieved successfully",
            "data": reviews,
            "status": "success",
            "status_code": 200
        }
        return make_response(jsonify(data), 200)
    
    if request.method == 'POST':
        body = request.get_json()

        review_data = ["provider_id", "review", "rating"]

        for data in review_data:
            if data not in body:
                return make_response(jsonify({"error": f"Missing required {data}"}), 400)
        construct_data = {}

        for key, value in body.items():
            if key not in review_data:
                return make_response(jsonify({"error": "Invalid data, Bad request"}), 400)
            construct_data[key] = value

        review = Review(**construct_data)
        
        provider = db.session.query(Provider).filter_by(id=body['provider_id']).one_or_none()

        db.session.add(review)
        #provider_ratings = [review.rating for review in provider.reviews]
        #rating_sum = 0
        #for rating in provider_ratings:
        #    rating_sum += int(rating)

        #rating = rating_sum / len(provider_ratings)

        #setattr(provider, "rating", rating)
        
        db.session.commit()

        data = {
            "message": "Review created successfully",
            "data": review.to_dict(),
            "status": 'success',
            "status_code": 201
        }
        return make_response(jsonify(data), 201)
    
@review_views.route('/<id>', methods=['GET', 'PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
def review(id):   
    review = db.session.query(Review).filter_by(id=id).one_or_none()
    if not review:
        abort(404)

    if request.method == 'GET':
        data = {
        "message": "Review retrieved successfully",
        "data": review.to_dict(),
        "status": "success",
        "status_code": 200
        }
        return make_response(jsonify(data), 200)
    
    if request.method == 'PUT':
        body = request.get_json()

        for key, value in body.items():
            setattr(review, key, value)
        db.session.commit()

        data = {
        "message": "Review updated successfully",
        "data": review.to_dict(),
        "status": "success",
        "status_code": 200
        }
        return make_response(jsonify(data), 200)
    
    if request.method == 'DELETE':
        db.session.delete(review)
        db.session.commit()

        data = {
        "message": "Review deleted successfully",
        "status": "success",
        "status_code": 203
        }
        return make_response(jsonify(data), 203)