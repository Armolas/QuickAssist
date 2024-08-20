#!/usr/bin/python3
"""This is the class for service categories"""
from .base_model import BaseModel
from ..extensions import db


provider_service_association = db.Table(
    'provider_service',
    db.Column('provider_id', db.String, db.ForeignKey('provider.id'), primary_key=True),
    db.Column('service_id', db.String, db.ForeignKey('service.id'), primary_key=True)
)

class Service(BaseModel):
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    providers = db.relationship('Provider', secondary=provider_service_association, backref='skills')

    def to_dict(self):
        data = {
            "id": self.id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "name": self.name,
            "description": self.description
            }
        
        return data
    
    def providers_list(self):
        providers = [provider.to_dict() for provider in self.providers]

        return providers