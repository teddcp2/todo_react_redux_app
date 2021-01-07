from flask import render_template
from . import root_app_bp


@root_app_bp.route("/")
def home():
    return render_template("index.html")
