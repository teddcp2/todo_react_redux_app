from flask_restful import Resource, reqparse


from todo_app import db
from todo_app.models.bucket_model import Bucket as bucket_db


class BucketAPI(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("name", required=True,
                        help="Name is missing", type=str)

    # Create a bucket
    def post(self):
        args = BucketAPI.parser.parse_args()
        # print(args)
        name = args.get('name', None).strip().lower()

        check_name = bucket_db.query.filter_by(name=name).first()

        if not check_name:
            new_bucket = bucket_db(name=name)
            # print(new_bucket, name)
            db.session.add(new_bucket)
            db.session.commit()

            created_bucket_id = bucket_db.query.filter_by(name=name).first().id
            return {"status": "success", "id": created_bucket_id}, 201

        return {"status": "failure"}, 400

    # Not implemented on client side
    # Update the name of a bucket
    def patch(self, id):
        bucket_to_update = bucket_db.query.filter_by(id=id).first()

        if not bucket_to_update:
            return {"status": "failure"}, 404

        args = BucketAPI.parser.parse_args()
        name = args.get('name', None).strip().lower()

        bucket_to_update.name = name
        db.session.commit()

        return {"status": "success"}, 200

    # Not implemented on Client side
    # Delete the Bucket name
    # def delete(self, id):
    #     print(id)
    #     bucket_to_delete = bucket_db.query.get(id)

    #     print(bucket_to_delete, type(bucket_to_delete))

    #     if not bucket_to_delete:
    #         return {"status": "failure"}, 404

    #     bucket_to_delete['deleted'] = "YES"

    #     db.session.commit()

    #     return {"status" "success"}, 200
