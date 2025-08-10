from flask import Flask, request
from flask_cors import CORS


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(
        app,
        resources={r"/*": {"origins": "*"}},
        supports_credentials=False,
    )

    # Import and attach routes
    from .routes import register_routes
    register_routes(app)

    @app.get("/health")
    def health():
        return {"status": "ok"}

    @app.after_request
    def add_cors_headers(response):
        # Ensure CORS headers are present even on errors
        response.headers.setdefault("Access-Control-Allow-Origin", "*")
        response.headers.setdefault("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        response.headers.setdefault(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization",
        )
        return response

    return app
