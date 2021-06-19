"""
This files is for business logic
"""
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


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/api/v1/register', methods=["POST"])
def register_user():
    user_json = request.json
    try:
        db_user = UserQuery.create_user(user_json)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500

    return {"id": db_user.id}, 200


if __name__ == '__main__':
    app.run(debug=True)
