from flask_restful import Resource, reqparse, fields, marshal_with
from todo_app.models.item_model import Item as item_db


resource_fields = {
    "id": fields.Integer,
    "name": fields.String,
    "category": fields.Integer,
    "created_date": fields.DateTime,
    "mark_complete": fields.String,
    "deleted": fields.String
}


class ItemsAPI(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("recent", type=bool, help="Optional Param")

    # Get all the items OR recetly added top 3 items
    @marshal_with(resource_fields, envelope='tasks')
    def get(self):
        items = []
        args = ItemsAPI.parser.parse_args()
        recent_flag = args.get("recent", False)

        # Return all
        if not recent_flag:
            items = item_db.query.order_by(item_db.created_date.desc()).all()
        else:
            # Return the recent 3 items sorted by created_date
            items = item_db.query.order_by(
                item_db.created_date.desc()).limit(3).all()

        return items, 200
