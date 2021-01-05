from .items_api import ItemsAPI
from flask import Blueprint
from flask_restful import Api
from flask_cors import CORS

items_bp = Blueprint("Items", __name__)
items_api = Api(items_bp)

CORS(items_bp)

items_api.add_resource(ItemsAPI, "", endpoint='items')
