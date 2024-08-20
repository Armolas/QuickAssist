from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import bcrypt
from flask_mail import Mail


db = SQLAlchemy()
migrate = Migrate()
mail = Mail()

def hash_password(password):
    salt = bcrypt.gensalt()

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return(hashed_password.decode("utf-8"))

def validate_password(password, hashed_password):
    is_valid = bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

    return is_valid

def is_authenticated(request):
    from .models.session import Session
    session_id = request.cookies.get("session_id")

    session = db.session.query(Session).filter_by(id=session_id).one_or_none()
    if session:
        return session.user_id
    return None