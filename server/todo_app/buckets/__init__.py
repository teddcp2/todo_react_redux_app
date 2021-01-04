from flask import Blueprint
from flask_restful import Api

from .buckets_api import BucketsAPI


buckets_bp = Blueprint("Buckets", __name__)
buckets_api = Api(buckets_bp)

buckets_api.add_resource(BucketsAPI, "", endpoint="buckets")
