from flask import Blueprint
from flask_restful import Api

from .item_api import ItemAPI


item_bp = Blueprint("Item", __name__)
item_api = Api(item_bp)

item_api.add_resource(ItemAPI, "", "/<int:id>/update",
                      "/<int:id>/delete", endpoint="task")
