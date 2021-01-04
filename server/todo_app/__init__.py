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

        from . import routes  # Importing routes

        from .models.item_model import Item
        from .models.bucket_model import Bucket

        # Creating and committing sql tables for our data models
        db.create_all()
        db.session.commit()

        # Importing Resources
        from .resources.items.items_resources import ItemsAPI
        from .resources.buckets.buckets_resources import BucketsAPI
        from .resources.bucket.bucket_api import BucketAPI
        from .resources.item.item_api import ItemAPI
        # from .resources.item.item_delete_api import ItemDeleteAPI
        # from .resources.item.item_update_api import ItemUpdateAPI

        # Adding the resources
        api.add_resource(ItemsAPI, "/tasks", endpoint="items")
        api.add_resource(BucketsAPI, "/buckets", endpoint="buckets")

        api.add_resource(BucketAPI,
                         "/bucket",
                         "/bucket/<int:id>",
                         endpoint="bucket")

        api.add_resource(ItemAPI, "/task",
                                  "/task/<int:id>/update",
                         "/task/<int:id>/delete", endpoint="task")
        # api.add_resource(ItemCreateAPI, "/task/<int:id>/update",
        #                  endpoint="task-update")
        # api.add_resource(ItemCreateAPI, "/task/<int:id>/delete",
        #                  endpoint="task-delete")

        api.init_app(app)

        return app
