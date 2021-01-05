from flask_restx import Resource, fields, Api
from flask import Blueprint
from todo_app.models.bucket_model import Bucket as bucket_db

buckets_bp = Blueprint("Buckets", __name__)
buckets_api = Api(buckets_bp)

#########################################
# FLASK RESTFUL WAY... but you need to put it at the end..
# buckets_api.add_resource(BucketsAPI, "", endpoint="buckets")
##########################################

resource_fields = buckets_api.model("Buckets_Resource_Model", {
    "id": fields.Integer,
    "name": fields.String
})


@buckets_api.route("/buckets", endpoint="buckets", doc={"description": "Get all the available buckets"})
class BucketsAPI(Resource):

    # Get all the Buckets / Categories
    @buckets_api.response(200, "Success")
    @buckets_api.marshal_with(resource_fields, envelope='buckets')
    def get(self):
        buckets = bucket_db.query.all()
        return buckets, 200
