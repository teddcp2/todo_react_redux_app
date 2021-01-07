
from flask import Blueprint

root_app_bp = Blueprint("root_app", __name__)
from . import views