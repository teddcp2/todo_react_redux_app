from datetime import date
from flask_restful import Resource, reqparse, abort

from todo_app import db
from todo_app.models.item_model import Item as item_db


class ItemDeleteAPI(Resource):

    # parser = reqparse.RequestParser()
    # parser.add_argument("id", required=True, help="ID is missing", type=int)

    # Delete the item/ task
    def delete(self, id):
        item = item_db.query.get(id)

        if not item:
            return {"status": "failure"}, 404

        # args = ItemAPI.parser_for_rest.parse_args()
        # name = args.get('id', None)

        # item to update the delete column
        old_val = item['deleted']
        item['deleted'] = "NO" if old_val == "YES" else "YES"
        db.session.commit()

        return {"status" "success"}, 200

#  task/id/delete
