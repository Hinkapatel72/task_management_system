"""
Database queries relating to user operations.
"""
import os
import sys
from sqlalchemy.exc import *
from flask_bcrypt import Bcrypt

_CURRDIR = os.path.dirname(__file__)
_APPDIR = os.path.join(_CURRDIR, "..")
sys.path.append(_APPDIR)

from models import *
from TMSExceptions import *

bcrypt = Bcrypt(app)

def _validate_user(user):
    # TODO
    pass


def find_user_by_credentials(email, password):
    '''
      returns the user by email and password.
      @params: email and password
      @returns: user with matching email and password.
      @raise: InvalidInputException, TimeoutException, QueryException, ItemNotFoundException
    '''
    if (email is None or password is None):
        raise InvalidInputException("None email or password provided.")

    db_user = None
    try:
        db_user = User.query.filter_by(email=email).first()
    except TimeoutError as e:
        raise TimeoutException("Timeout error. Failed to get user by email and password. Error {}".format(e))
    except Exception as e:
        raise QueryException("Failed to find user by email and password {}. Error {}".format(id, e))

    if (db_user and bcrypt.check_password_hash(db_user.password, password)):
        return db_user

    raise ItemNotFoundException("User not found.")


def create_user(user):
    '''
     create a new user in database.
     @params: user dictionary
     @returns new database user created.
     raise: DuplicateEntryException, CreateNewItemException
    '''
    # prechecks
    _validate_user(user)
    print(user)

    try:
        checkUser = find_user_by_credentials(user['email'], user['password'])
        if checkUser:
            raise  DuplicateEntryException("user with email is already registered")
    except ItemNotFoundException as e:
        """
          it means new user.
        """
        print(Role.from_str(user['role'].upper()))
        print(UserType.from_str(user['user_type'].upper()))
        try:
            password_hash = bcrypt.generate_password_hash(user['password'])
            new_user = User(first_name = user['first_name'], last_name = user['last_name'],
                            email = user['email'], password = password_hash,
                            role = Role.from_str(user['role'].upper()),
                            user_type = UserType.from_str(user['user_type'].upper()),
                            itu_id = user['itu_id'])

            db.session.add(new_user)
            db.session.commit()
            return new_user
        except Exception as exc:
            raise CreateNewItemException("Failed to create new user. Reason {}".format(exc))
