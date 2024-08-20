from flask import Flask, make_response, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .extensions import db, migrate, mail
from .config import Config
from flask_swagger_ui import get_swaggerui_blueprint


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, supports_credentials=True)

    jwt = JWTManager(app)
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)
    SWAGGER_URL ='/swagger'
    API_URL = '/static/openapi.yaml'
    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={  # Swagger UI config overrides
        'app_name': "Quick Assist API"
    }
)

    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    @app.errorhandler(404)
    def not_found(error):
        return make_response(jsonify({"error": "Not found"}), 404)
    
    @app.errorhandler(401)
    def unauthorized(error):
        return make_response(jsonify({"error": "Unauthorized"}), 401)

    # Register blueprints
    from .views.users import user_views
    from .views.providers import provider_views
    from .views.services import service_views
    from .views.bookings import booking_views
    from .views.reviews import review_views
    from .views.auth import auth_views

    app.register_blueprint(user_views)
    app.register_blueprint(provider_views)
    app.register_blueprint(service_views)
    app.register_blueprint(booking_views)
    app.register_blueprint(review_views)
    app.register_blueprint(auth_views)

    return app