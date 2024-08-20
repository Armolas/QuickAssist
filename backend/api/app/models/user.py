#!/usr/bin/python3
"""This is the User Model class"""
from ..extensions import db
from .base_model import BaseModel
import base64
import os

def generate_secret_key():
    return base64.b32encode(os.urandom(10)).decode('utf-8')


class User(BaseModel):
    email = db.Column(db.String, unique=True, nullable=False)
    firstName = db.Column(db.String, nullable=False)
    lastName = db.Column(db.String, nullable=False)
    phoneNumber = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=True)
    password = db.Column(db.String, nullable=False)
    is_verified = db.Column(db.Boolean, default=False)
    otp_secret = db.Column(db.String(16), default=generate_secret_key)
    lastLogin = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

    def to_dict(self):
        user_data = {
            "id": self.id,
            "type": "user",
            "firstName": self.firstName,
            "lastName": self.lastName,
            "email": self.email,
            "address": self.address,
            "phoneNumber": self.phoneNumber,
            "lastLogin": self.lastLogin,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "is_verified": self.is_verified
        }
        return user_data