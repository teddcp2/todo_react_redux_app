from flask_restful import Resource, fields, marshal_with
from todo_app.models.bucket_model import Bucket as bucket_db

resource_fields = {
    "id": fields.Integer,
    "name": fields.String
}


class BucketsAPI(Resource):

    # Get all the Buckets / Categories
    @marshal_with(resource_fields, envelope='buckets')
    def get(self):
        buckets = bucket_db.query.all()
        return buckets, 200
