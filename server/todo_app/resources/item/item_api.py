from datetime import date
from flask_restful import Resource, reqparse, abort

from todo_app import db
from todo_app.models.item_model import Item as item_db


class ItemAPI(Resource):

    parser_for_post_only = reqparse.RequestParser()

    parser_for_post_only.add_argument(
        "name", required=True, help="Name is missing", type=str)
    parser_for_post_only.add_argument(
        "category", required=True, help="Category is missing", type=str)

    parser_for_update_only = reqparse.RequestParser()

    parser_for_update_only.add_argument("type", required=True,
                                        help="Type of updation is missing", type=str)
    parser_for_update_only.add_argument("new_name", required=False, type=str)

    # parser.add_argument("id", required=True, help="ID is missing", type=int)

    # # Name or completeness updation
    # parser.add_argument("type", required=True,
    #                     help="Type of updation is missing", type=str)
    # parser.add_argument("new_name", required=False, type=str)

    # Create a Item

    def post(self):
        args = ItemAPI.parser_for_post_only.parse_args()

        name = args.get('name', None)
        category = args.get('category', None)

        existing_flag = item_db.query.filter_by(name=name).first()

        if not existing_flag:

            new_item = item_db(name=name, category=category)
            db.session.add(new_item)
            db.session.commit()
            return {"status": "success"}, 201

        return {"status": "failure"}, 400

    # Update the item
    def patch(self, id):

        item = item_db.query.get(id)

        if not item:
            return {"status": "failure"}, 404

        args = ItemAPI.parser_for_update_only.parse_args()

        # Mark Complete type(MARK) or item name update type(EDIT)
        type_of_updation = args.get('type', None)
        entered_text = args.get('new_name', None)

        if type_of_updation == "MARK":
            old_val = item.mark_complete
            item.mark_complete = "NO" if old_val == "YES" else "YES"
        else:
            if not entered_text:
                return {"status": "failure"}, 405
            item.name = entered_text

        db.session.commit()
        return {"status": "success"}, 200

     # Delete the item/ task

    # Delete the item
    def delete(self, id):
        item = item_db.query.get(id)

        if not item:
            return {"status": "failure"}, 404

        # args = ItemAPI.parser_for_rest.parse_args()
        # name = args.get('id', None)

        # item to update the delete column
        old_val = item.deleted
        item.deleted = "NO" if old_val == "YES" else "YES"
        db.session.commit()

        return {"status": "success"}, 200


# task [POST]
# task/id/update [PATCH] - for name editing and mark Complete
# task/id/delete   [DELETE] - For deleting
