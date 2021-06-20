import os
import sys

_CURRDIR = os.path.dirname(__file__)
_APPDIR = os.path.join(_CURRDIR, "..")
sys.path.append(_APPDIR)

from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import request, jsonify, session
from models import app
from query import UserQuery
from TMSExceptions import *

login_manager = LoginManager(app)

@login_manager.user_loader
def load_user(id):
    '''
    Flask-Login knows nothing about databases, it needs the application's
    help in loading a user.
    For that reason, the extension expects that the application will configure a
    user loader function, that can be called to load a user given the ID
    NOTE: input id will be string. If database is using int as it, we need to
    convert it.
    '''
    try:
        user = UserQuery.find_user_by_id(int(id))
        return user
    except Exception as e:
        return None


def _login_user(user):
    if current_user and current_user.is_authenticated:
        return 200

    try:
        db_user = UserQuery.find_user_by_credentials(user["email"], user["password"])
        login_user(db_user)
        return 200
    except UnauthorizedUserException as e:
        raise UnauthorizedUserException("Unauthorized user. Error {}".format(e))


def _logout_user():

    logout_user()
    return 200


@app.route('/api/v1/register', methods=["POST"])
def register_user():
    user_json = request.json
    try:
        db_user = UserQuery.create_user(user_json)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500

    return {"id": db_user.id}, 200


@app.route('/api/v1/login', methods=["POST"])
def login():
    login_details = request.json
    try:
        val = _login_user(login_details)
        return jsonify({"status":"in progress"}), val
    except UnauthorizedUserException as e:
        return jsonify({"error":str(e)}), 401
    except Exception as e:
        return jsonify({"error":str(e)}), 500


@app.route('/api/v1/logout', methods=["POST"])
def logout():
    return jsonify({"status":"ok"}), _logout_user()


@app.route("/api/v1/auth_check", methods=["GET"])
@login_required
def auth_check():
    return jsonify({"status": "ok"}), 200
