from flask_restful import Resource, reqparse, fields, marshal_with
from todo_app.models.item_model import Item as item_db
from flask import request


resource_fields = {
    "id": fields.Integer,
    "name": fields.String,
    "category": fields.String,
    "created_date": fields.DateTime,
    "mark_complete": fields.String,
    "deleted": fields.String
}


class ItemsAPI(Resource):

    # Get all the items OR recetly added top 3 items
    @marshal_with(resource_fields, envelope='tasks')
    def get(self):
        # parser = reqparse.RequestParser()
        # parser.add_argument("recent", type=bool, help="Optional Param")
        items = []
        args = request.args
        # print(args)
        recent_flag = args.get("recent", False)

        # # Return all
        if recent_flag == "false":
            items = item_db.query.order_by(item_db.created_date.desc()).all()
        else:
            # Return the recent 3 items sorted by created_date
            items = item_db.query.order_by(
                item_db.id.desc()).limit(3).all()

        for item in items:
            # print(item, item.bucket, item.bucket.name)
            item.category = item.bucket.name

        return items, 200
