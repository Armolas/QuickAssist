#!/usr/bin/python3
"""This is the session class model"""
from .base_model import BaseModel
from ..extensions import db


class Session(BaseModel):
    user_id = db.Column(db.String, nullable=False)