"""
This files is for business logic
"""
import os
import sys
from flask_cors import CORS


_CURRDIR = os.path.dirname(__file__)
_APPDIR = os.path.join(_CURRDIR, "..")
sys.path.append(_APPDIR)

from flask_login import LoginManager, current_user, login_user, logout_user, login_required
from flask import request, jsonify, session
from flask_cors import CORS
from models import app
from query import userquery
from TMSExceptions import *
from services.tms_user import *
cors = CORS(app)



app.secret_key = "AFAUEHsdfsFIR645tfsdfsdDSW"
if __name__ == '__main__':
    _ = CORS(app, resources={r"/api/*": {"origins":"*"}})
    app.run(debug=True, threaded=True)
