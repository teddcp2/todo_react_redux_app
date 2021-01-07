from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS

api = Api()
db = SQLAlchemy()
migrate = Migrate()


def init_app():
    """core application."""
    app = Flask(__name__, static_folder="./client/static",
                template_folder="./client")
    app.config.from_object("config.Config")

    # CORS(app, resources={r'/*': {'origins': '*'}})

    with app.app_context():

        db.init_app(app)
        migrate.init_app(app, db)

        from .models.item_model import Item
        from .models.bucket_model import Bucket

        # Creating and committing sql tables for our data models
        db.create_all()
        db.session.commit()

        # Importing Blueprints
        from .item import item_bp
        from .bucket import bucket_bp
        from .items import items_bp
        from .buckets import buckets_bp
        from .rootapp import root_app_bp

        app.register_blueprint(root_app_bp)
        app.register_blueprint(bucket_bp, url_prefix="/bucket")
        app.register_blueprint(buckets_bp, url_prefix='/buckets')
        app.register_blueprint(item_bp, url_prefix="/task")
        app.register_blueprint(items_bp, url_prefix="/tasks")

        api.init_app(app)

        CORS(app, resources={r"/*": {"origins": "*"}},
             supports_credentials=True)

        print(app.url_map)
        # resources={r"/api/*": {"origins": "*"}}

        return app
