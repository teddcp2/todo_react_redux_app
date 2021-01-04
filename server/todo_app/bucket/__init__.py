from flask import Blueprint
from flask_restful import Api

from .bucket_api import BucketAPI


bucket_bp = Blueprint("Bucket", __name__)
bucket_api = Api(bucket_bp)

bucket_api.add_resource(BucketAPI, "", "/<int:id>", endpoint="bucket")
