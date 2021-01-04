from flask import Blueprint
from flask_restful import Api

from .items_api import ItemsAPI


items_bp = Blueprint("Items", __name__)
items_api = Api(items_bp)

items_api.add_resource(ItemsAPI, "", endpoint="tasks")
