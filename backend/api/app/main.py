#!/usr/bin/python3
"""The main app file"""
from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)