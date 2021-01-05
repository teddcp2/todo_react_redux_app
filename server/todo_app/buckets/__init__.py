from .buckets_api import BucketsAPI
from flask import Blueprint
from flask_cors import CORS
from flask_restful import Api

buckets_bp = Blueprint("Buckets", __name__)
buckets_api = Api(buckets_bp)

CORS(buckets_bp)


buckets_api.add_resource(BucketsAPI, "", endpoint='buckets')
