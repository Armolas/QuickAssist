#!/usr/bin/python3
"""This is the model for the provider object"""
from .base_model import BaseModel
from ..extensions import db
import os
import base64

def generate_secret_key():
    return base64.b32encode(os.urandom(10)).decode('utf-8')


class Provider(BaseModel):
    email = db.Column(db.String, unique=True, nullable=False)
    firstName = db.Column(db.String, nullable=False)
    lastName = db.Column(db.String, nullable=False)
    phoneNumber = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=True)
    password = db.Column(db.String, nullable=False)
    is_verified = db.Column(db.Boolean, default=False)
    otp_secret = db.Column(db.String(16), default=generate_secret_key)
    lastLogin = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    gender = db.Column(db.String, nullable=False)
    about = db.Column(db.Text, nullable=False)
    age = db.Column(db.Integer)
    chargePerHour = db.Column(db.Integer)
    rating = db.Column(db.Integer, default=5)

    def to_dict(self):
        skills = [skill.name for skill in self.skills]
        user_data = {
            "id": self.id,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "email": self.email,
            "address": self.address,
            "phoneNumber": self.phoneNumber,
            "gender": self.gender,
            "about": self.about,
            "age": self.age,
            "chargePerHour": self.chargePerHour,
            "rating": self.rating,
            "type": "provider",
            "is_verified": self.is_verified,
            "skills": skills,
            "lastLogin": self.lastLogin,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

        return user_data