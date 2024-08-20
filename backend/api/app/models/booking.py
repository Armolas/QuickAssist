#!/usr/bin/python3
"""This is the booking class Model"""
from .base_model import BaseModel
from ..extensions import db


class Booking(BaseModel):
    date = db.Column(db.DateTime(timezone=True), nullable=False)
    description = db.Column(db.Text)
    status = db.Column(db.String, nullable=False)
    user_id = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)
    provider_id = db.Column(db.String, db.ForeignKey('provider.id'), nullable=False)
    service_id = db.Column(db.String, db.ForeignKey('service.id'), nullable=False)
    user = db.relationship("User", backref="bookings")
    provider = db.relationship("Provider", backref="bookings")
    service = db.relationship("Service")

    def to_dict(self):
        data = {
            "id": self.id,
            "created_at": self.created_at,
            "date": self.date,
            "description": self.description,
            "status": self.status,
            "service": self.service.name,
            "user_id": self.user_id,
            "provider_id": self.provider_id,
            "user": f"{self.user.firstName} {self.user.lastName}",
            "provider": f"{self.provider.firstName} {self.provider.lastName}"
        }

        return data