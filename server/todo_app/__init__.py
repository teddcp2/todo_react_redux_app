import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api


api = Api()
db = SQLAlchemy()
migrate = Migrate()


def init_app():
    """core application."""
    app = Flask(__name__)
    app.config.from_object("config.Config")
    # print(app.config)

    with app.app_context():

        db.init_app(app)
        migrate.init_app(app, db)

        from .models.item_model import Item
        from .models.bucket_model import Bucket

        # Creating and committing sql tables for our data models
        db.create_all()
        db.session.commit()

        # Importing Blueprints
        from .bucket import bucket_bp
        from .buckets import buckets_bp
        from .item import item_bp
        from .items import items_bp

        app.register_blueprint(bucket_bp, url_prefix="/bucket")
        app.register_blueprint(buckets_bp, url_prefix="/buckets")
        app.register_blueprint(item_bp, url_prefix="/task")
        app.register_blueprint(items_bp, url_prefix="/tasks")

        # Adding the resources
        # api.add_resource(ItemsAPI, "/tasks", endpoint="items")
        # api.add_resource(BucketsAPI, "/buckets", endpoint="buckets")

        # api.add_resource(BucketAPI,
        #                  "/bucket",
        #                  "/bucket/<int:id>",
        #                  endpoint="bucket")

        # api.add_resource(ItemAPI, "/task",
        #                           "/task/<int:id>/update",
        #                  "/task/<int:id>/delete", endpoint="task")
        # api.add_resource(ItemCreateAPI, "/task/<int:id>/update",
        #                  endpoint="task-update")
        # api.add_resource(ItemCreateAPI, "/task/<int:id>/delete",
        #                  endpoint="task-delete")

        api.init_app(app)

        # print(app.url_map)

        return app
