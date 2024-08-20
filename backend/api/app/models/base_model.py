#!/usr/bin/python3
"This module contains the base model for all objects"
import uuid
from ..extensions import db


class BaseModel(db.Model):
    """ This model creates helper methods for all models
    """
    __abstract__ = True
    id = db.Column(db.String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())