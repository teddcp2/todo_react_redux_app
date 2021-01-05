from flask import Blueprint
from flask_restx import Api, Resource, reqparse, fields
from todo_app.models.item_model import Item as item_db

items_bp = Blueprint("Items", __name__)
items_api = Api(items_bp)

# buckets_api.add_resource(BucketsAPI, "", endpoint="buckets")
# items_api.add_resource(ItemsAPI, "", endpoint="tasks")

resource_fields = items_api.model("Items_Resource_Model", {
    "id": fields.Integer,
    "name": fields.String,
    "category": fields.Integer,
    "created_date": fields.DateTime,
    "mark_complete": fields.String,
    "deleted": fields.String
})


@items_api.route("/", endpoint="items")
class ItemsAPI(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("recent", type=bool, help="Optional Param")

    # Get all the items OR recetly added top 3 items
    @items_api.marshal_with(resource_fields, envelope='tasks')
    def get(self):
        items = []
        args = ItemsAPI.parser.parse_args()
        # print(args)
        recent_flag = args.get("recent", False)

        # Return all
        if not recent_flag:
            items = item_db.query.order_by(item_db.created_date.desc()).all()
        else:
            # Return the recent 3 items sorted by created_date
            items = item_db.query.order_by(
                item_db.created_date.desc()).limit(3).all()

        return items, 200
