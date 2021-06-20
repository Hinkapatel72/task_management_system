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
from services.tms_user import *

app.secret_key = "AFAUEHsdfsFIR645tfsdfsdDSW"
if __name__ == '__main__':
    app.run(debug=True)
