#!/usr/bin/python3
"""This is the review class model"""
from .base_model import BaseModel
from ..extensions import db


class Review(BaseModel):
    review = db.Column(db.Text)
    rating = db.Column(db.Integer, nullable=False)
    provider_id = db.Column(db.String, db.ForeignKey('provider.id'), nullable=False)
    provider = db.relationship("Provider", backref="reviews")

    def to_dict(self):
        data = {
            "id": self.id,
            "review": self.review,
            "rating": self.rating,
            "provider_id": self.provider_id,
            "provider": f"{self.provider.firstName} {self.provider.lastName}"
        }
        return data