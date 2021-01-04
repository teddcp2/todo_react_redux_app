from datetime import date
from flask_restful import Resource, reqparse, abort

from todo_app import db
from todo_app.models.item_model import Item as item_db


class ItemUpdateAPI(Resource):

    parser = reqparse.RequestParser()

    # parser.add_argument("id", required=True, help="ID is missing", type=int)

    # Name or completeness updation
    parser.add_argument("type", required=True,
                        help="Type of updation is missing", type=str)
    parser.add_argument("new_name", required=False, type=str)

    # Update the item

    def put(self, id):

        item = item_db.query.get(id)

        if not item:
            return {"status": "failure"}, 404

        args = ItemUpdateAPI.parser.parse_args()

        # Mark Complete type(MARK) or item name update type(EDIT)
        type_of_updation = args.get('type', None)
        entered_text = args.get('new_name', None)

        if type_of_updation == "MARK":
            old_val = item['mark_complete']
            item['mark_complete'] = "NO" if old_val == "YES" else "YES"
        else:
            if not entered_text:
                return {"status": "failure"}, 405
            item['name'] = entered_text

        db.session.commit()
        return {"status" "success"}, 200


# task/id/update
