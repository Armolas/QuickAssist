#!/usr/bin/python3
"""The authentication view routes"""

from flask import Blueprint, jsonify, request, make_response, abort
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..extensions import db, hash_password, validate_password, mail
from ..models.provider import Provider
from flask_mail import Message
from ..models.user import User
from ..models.service import Service
from ..models.session import Session
import pyotp

auth_views = Blueprint('auth_views', __name__, url_prefix="/api/v1/auth")

@auth_views.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def auth():
    """checks if a user is authenticated"""
    current_user = get_jwt_identity()
    
    return make_response(jsonify({"authenticated": current_user}), 200)

@auth_views.route('/register', methods=['POST'], strict_slashes=False)
def register():
    """registers a user"""
    body = request.get_json()

    user_type = body.get('user_type')
    user_data = ['firstName', 'lastName', 'email', 'address', 'phoneNumber', 'password', 'password2', "user_type"]
    provider_data = ['skills', 'gender', 'age', 'chargePerHour', 'about']

    for data in user_data:
        if data not in body:
            return make_response(jsonify({'error': f"missing {data}"}), 400)
        
    if (body['password'] != body['password2']):
        return make_response(jsonify({"error": "password doesn't match"}), 400)
    
    email = body["email"]
    user = db.session.query(User).filter_by(email=email).first()
    provider = db.session.query(Provider).filter_by(email=email).first()
    if user or provider:
        return make_response(jsonify({'error': f'email {email} already exists'}), 400)
    
    if user_type == 'user':
        construct_data = {}
        for key, value in body.items():
            if key not in user_data:
                return make_response(jsonify({"error": "Invalid data, Bad request"}), 400)
            if key not in ["password", "password2", "user_type"]:
                construct_data[key] = value
        password = hash_password(body['password'])
        construct_data['password'] = password
        user = User(**construct_data)
        db.session.add(user)
        db.session.commit()

        data = {
        "status": "success",
        "message": f"User {user.email} registered successfully",
        "data": user.to_dict(),
        "status_code": 201
        }
        return make_response(jsonify(data), 201)
    

    if user_type == 'provider':
        for data in provider_data:
            if data not in body and data != 'chargePerHour':
                return make_response(jsonify({'error': f"missing {data}"}), 400)
        construct_data = {}
        for key, value in body.items():
            if key not in user_data and key not in provider_data:
                return make_response(jsonify({"error": "Invalid data, Bad request"}), 400)
            if key not in ["password", "password2", "skills", "user_type"]:
                construct_data[key] = value
        password = hash_password(body['password'])
        construct_data['password'] = password
        provider = Provider(**construct_data)

        skills = body['skills']
        for skill in skills:
            service = db.session.query(Service).filter_by(name=skill).one_or_none()
            if service:
                provider.skills.append(service)

        db.session.add(provider)
        db.session.commit()

        data = {
        "status": "success",
        "message": f"Provider {provider.email} registered successfully",
        "data": provider.to_dict(),
        "status_code": 201
        }
        return make_response(jsonify(data), 201)
    
    return make_response(jsonify({"error": "please specify user type"}), 400)

@auth_views.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """logs a user in and returns the access token"""
    body = request.get_json()

    login_data = ['email', 'password']

    for data in login_data:
        if data not in body:
            return make_response(jsonify({"error": f"missing {data}"}), 403)
    
    email = body["email"]
    password = body["password"]
    user = db.session.query(User).filter_by(email=email).first()
    if user:
        hashed_password = user.password
        valid_password = validate_password(password, hashed_password)
        if valid_password:
            access_token = create_access_token(identity=user.id)
            resp = jsonify({
                "message": "login successful",
                "user": user.to_dict(),
                "access_token": access_token
            })
            resp.set_cookie('access_token', access_token)
            return make_response(resp, 200)

        else:
            return make_response(jsonify({'error': "incorrect password"}), 403)

    provider = db.session.query(Provider).filter_by(email=email).first()
    if provider:
        hashed_password = provider.password
        valid_password = validate_password(password, hashed_password)
        if valid_password:
            access_token = create_access_token(identity=provider.id)
            resp = jsonify({
                "message": "login successful",
                "user": provider.to_dict(),
                "access_token": access_token
            })
            resp.set_cookie('access_token', access_token, max_age=3600)
            return make_response(resp, 200)

        else:
            return make_response(jsonify({'error': "incorrect password"}), 403)
        
    return make_response(jsonify({'error': "email does not exist"}), 403)

@auth_views.route('/logout', methods=['DELETE'], strict_slashes=False)
def logout():
    """logs a user out"""
    session_id = request.cookies.get("session_id")

    session = db.session.query(Session).filter_by(id=session_id).one_or_none()
    if session:
        db.session.delete(session)
        db.session.commit()
        resp = jsonify({"message": "user logged out successfully"})
        resp.set_cookie('session_id', '', expires=0)
        return make_response(resp, 200)
    else:
        abort(404)

@auth_views.route('/verify-email', methods=['GET', 'POST'], strict_slashes=False)
def verify_email():
    """verifies a user email"""
    email = request.args.get('email')
    
    if request.method == 'GET':
        # Try to find the user in the User model first
        user = db.session.query(User).filter_by(email=email).first()
        
        if not user:
            # If not found, try the Provider model
            user = db.session.query(Provider).filter_by(email=email).first()
            
        if not user:
            abort(404)
        
        # Generate the OTP
        totp = pyotp.TOTP(user.otp_secret, interval=300)
        otp = totp.now()

        # Prepare and send the email
        msg = Message('Verify Your Email', recipients=[user.email])
        msg.body = f"Hi {user.firstName},\nThank you for registering on Quick Assist.\nYour OTP for Verification is: {otp}\nIt will expire in 5 minutes."

        try:
            mail.send(msg)
            return make_response(jsonify({"message": "Your OTP for verification has been sent to your email"}), 200)
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 400)
        
    if request.method == 'POST':
        body = request.get_json()

        req_data = ["email", "otp"]
        for data in req_data:
            if data not in body:
                return make_response(jsonify({'error': f"missing {data}"}), 400)
        email = body['email']
        otp = body['otp']

        user = db.session.query(User).filter_by(email=email).first()
        
        if not user:
            # If not found, try the Provider model
            user = db.session.query(Provider).filter_by(email=email).first()
            
        if not user:
            abort(404)

        totp = pyotp.TOTP(user.otp_secret, interval=300)
        if totp.verify(otp):
            user.is_verified = True
            db.session.commit()
            return make_response(jsonify({"message": "Email verified successfully!"}), 200)
        else:
            return make_response(jsonify({"error": "Invalid or expired OTP"}), 400)

@auth_views.route('/reset-password', methods=['GET', 'POST'], strict_slashes=False)
def reset_password():
    """ resets a user password"""
    email = request.args.get('email')
    
    if request.method == 'GET':
        # Try to find the user in the User model first
        user = db.session.query(User).filter_by(email=email).first()
        
        if not user:
            # If not found, try the Provider model
            user = db.session.query(Provider).filter_by(email=email).first()
            
        if not user:
            return make_response(jsonify({"error": "email does not exist!"}), 404)
        
        # Generate the OTP
        totp = pyotp.TOTP(user.otp_secret, interval=300)
        otp = totp.now()

        # Prepare and send the email
        msg = Message('Password Reset', recipients=[user.email])
        msg.body = f"Hi {user.firstName},\n\nUse this OTP to reset your password on Quick Assist.\n{otp}\nIt will expire in 5 minutes.\n\nIgnore this mail if you did not make this request."

        try:
            mail.send(msg)
            return make_response(jsonify({"message": "Your OTP for password reset has been sent to your mail"}), 200)
        except Exception as e:
            return make_response(jsonify({"error": str(e)}), 400)
        
    if request.method == 'POST':
        body = request.get_json()

        req_data = ["email", "otp", "password", "password2"]
        for data in req_data:
            if data not in body:
                return make_response(jsonify({'error': f"missing {data}"}), 400)
        email = body['email']
        otp = body['otp']
        password = body['password']
        password2 = body['password2']

        if (password != password2):
            return make_response(jsonify({"error": "password doesn't match"}), 400)

        user = db.session.query(User).filter_by(email=email).first()
        
        if not user:
            # If not found, try the Provider model
            user = db.session.query(Provider).filter_by(email=email).first()
            
        if not user:
            abort(404)

        totp = pyotp.TOTP(user.otp_secret, interval=300)
        if totp.verify(otp):
            password = hash_password(password)
            user.password = password
            db.session.commit()
            return make_response(jsonify({"message": "Password reset successfully!\nPlease login to continue"}), 200)
        else:
            return make_response(jsonify({"error": "Invalid or expired OTP"}), 400)