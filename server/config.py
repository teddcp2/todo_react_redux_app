import secrets
import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
print(basedir)

load_dotenv(os.path.join(basedir, 'config.env'))


class Config:
    """Set Flask configuration from .env file."""

    # General Config
    SECRET_KEY = secrets.token_hex(100)  # os.environ.get('SECRET_KEY')
    FLASK_APP = os.environ.get('FLASK_APP')
    FLASK_ENV = os.environ.get('FLASK_ENV')
    DEBUG = os.environ.get("DEBUG")
    CSRF_ENABLED = True
    CORS_HEADERS = 'Content-Type'

    # Database
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL', 'sqlite:///data.db')  # os.environ.get("DATABASE_URI")
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
