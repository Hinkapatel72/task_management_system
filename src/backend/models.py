import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import UserMixin
import enum
from backend.constants import TASK_TYPE_MAPPING, ROLE_MAPPING, USER_TYPE_MAPPING, TASK_PRIORITY_MAPPING, \
    TASK_STATE_MAPPING
# from . constants import TASK_TYPE_MAPPING, ROLE_MAPPING, USER_TYPE_MAPPING, TASK_PRIORITY_MAPPING, \
#     TASK_STATE_MAPPING

app = Flask(__name__)
# Below is the set up for database where database=tms, db_password=password12, db_user=root, db_host=localhost
if not os.getenv("DATABASE_URL", None):
    raise Exception("DATABASE_URL not set in environment (mysql://username:password@localhost/tms")

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", None)
print("dn runs on port-------", app.config['SQLALCHEMY_DATABASE_URI'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
app.config['JSON_SORT_KEYS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)


class Base(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    created_date = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    modified_date = db.Column(db.DateTime, nullable=False, server_default=db.func.now())


class Department(Base):
    """ Model for Departments list """
    __tablename__ = 'department'

    department_name = db.Column(db.String(80), unique=True, nullable=False)
    department_email = db.Column(db.String(200), unique=True, nullable=False)
    department_description = db.Column(db.String(300),  nullable=True)

    def __repr__(self):
        return '<Department Name  %s>' % self.department_name


class TaskType(enum.Enum):
    """ Model for Tasks Types """

    QUESTION = TASK_TYPE_MAPPING['QUESTION']
    INCIDENT = TASK_TYPE_MAPPING['INCIDENT']
    PROBLEM = TASK_TYPE_MAPPING['PROBLEM']
    FEATURE_REQUEST = TASK_TYPE_MAPPING['FEATURE_REQUEST']
    REFUND = TASK_TYPE_MAPPING['REFUND']

    @classmethod
    def _missing_(cls, value: object) -> "TaskType":
        """ Overwrite from Enum to set a default return when value is not defined in  Status
        Args:
            value: the undefined value
        Returns:
            Default Status
        """
        return "TaskType is not implemented"


# class TaskPriority(enum.Enum):
#     """ Model for Tasks Priority """
#
#     LOW = "LOW"
#     MEDIUM = "MEDIUM"
#     HIGH = "HIGH"
#     URGENT = "URGENT"
#
#     @staticmethod
#     def from_str(string_val):
#         mapping = {
#             "LOW": TaskPriority.LOW,
#             "MEDIUM": TaskPriority.MEDIUM,
#             "HIGH": TaskPriority.HIGH,
#             "URGENT": TaskPriority.URGENT
#         }
#
#         val = mapping.get(string_val)
#         if not val:
#             raise Exception("Priority {} is not implemented".format(string_val))
#         return val

class TaskPriority(enum.Enum):
    """ Model for Tasks Priority """

    LOW = TASK_PRIORITY_MAPPING["LOW"]
    MEDIUM = TASK_PRIORITY_MAPPING["MEDIUM"]
    HIGH = TASK_PRIORITY_MAPPING["HIGH"]
    URGENT = TASK_PRIORITY_MAPPING["URGENT"]

    @classmethod
    def _missing_(cls, value: object) -> "TaskPriority":
        """ Overwrite from Enum to set a default return when value is not defined in  Status
        Args:
            value: the undefined value
        Returns:
            Default Status
        """
        return "TaskPriority is not implemented"


# class TaskState(enum.Enum):
#     """ Model for Tasks State """
#
#     SCREEN = "SCREEN"
#     ASSIGNED = "ASSIGNED"
#     RESOLVED = "RESOLVED"
#     BLOCKED = "BLOCKED"
#     UNBLOCKED = "UNBLOCKED"
#
#     @staticmethod
#     def from_str(string_val):
#         mapping = {
#             "SCREEN": TaskState.SCREEN,
#             "ASSIGNED": TaskState.ASSIGNED,
#             "RESOLVED": TaskState.RESOLVED,
#             "BLOCKED": TaskState.BLOCKED,
#             "UNBLOCKED": TaskState.UNBLOCKED
#         }
#
#         val = mapping.get(string_val)
#         if not val:
#             raise Exception("Tasks State {} is not implemented".format(string_val))

class TaskState(enum.Enum):
    """ Model for Tasks State """

    SCREEN = TASK_STATE_MAPPING["SCREEN"]
    ASSIGNED = TASK_STATE_MAPPING["ASSIGNED"]
    RESOLVED = TASK_STATE_MAPPING["RESOLVED"]
    BLOCKED = TASK_STATE_MAPPING["BLOCKED"]
    UNBLOCKED = TASK_STATE_MAPPING["UNBLOCKED"]

    @classmethod
    def _missing_(cls, value: object) -> "TaskState":
        """ Overwrite from Enum to set a default return when value is not defined in  Status
        Args:
            value: the undefined value
        Returns:
            Default Status
        """
        return "TaskState is not implemented"


# class Role(enum.Enum):
#     """ Model for staff Role """
#
#     ADMIN = "ADMIN"
#     REGULAR = "REGULAR"
#
#     @staticmethod
#     def from_str(string_val):
#         mapping = {
#             "ADMIN": Role.ADMIN,  # full access.
#             "REGULAR": Role.REGULAR  # only read write access.
#         }
#
#         val = mapping.get(string_val)
#         if not val:
#             raise Exception("Role {} is not implemented".format(string_val))
#
#         return val

class Role(enum.Enum):
    """ Model for staff Role """

    ADMIN = ROLE_MAPPING['ADMIN']
    REGULAR = ROLE_MAPPING['REGULAR']

    @classmethod
    def _missing_(cls, value: object) -> "Role":
        """ Overwrite from Enum to set a default return when value is not defined in  Status
        Args:
            value: the undefined value
        Returns:
            Default Status
        """
        # logger.warning("%s is not defined in %s, use default value: %s", value, cls.__name__, Status.UNKNOWN)
        return "Role is not implemented"


# class UserType(enum.Enum):
#     """ Model for staff Role """
#
#     STUDENT = "STUDENT"
#     EMPLOYEE = "EMPLOYEE"
#
#     @staticmethod
#     def from_str(string_val):
#         mapping = {
#             "STUDENT": UserType.STUDENT,
#             "EMPLOYEE": UserType.EMPLOYEE
#         }
#
#         val = mapping.get(string_val)
#         if not val:
#             raise Exception("User Type {} is not implemented".format(string_val))
#
#         return val

class UserType(enum.Enum):
    """ Model for user  type """

    STUDENT = USER_TYPE_MAPPING["STUDENT"]
    EMPLOYEE = USER_TYPE_MAPPING["EMPLOYEE"]

    @classmethod
    def _missing_(cls, value: object) -> "UserType":
        """ Overwrite from Enum to set a default return when value is not defined in  Status
        Args:
            value: the undefined value
        Returns:
            Default Status
        """
        # logger.warning("%s is not defined in %s, use default value: %s", value, cls.__name__, Status.UNKNOWN)
        return "UserType is not implemented"


class User(Base, UserMixin):
    """ Model for User details """

    __tablename__ = 'user'

    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    role = db.Column(db.Enum(Role))
    user_type = db.Column(db.Enum(UserType))
    employee_id = db.Column(db.Integer, unique=True, nullable=False)
    student_id = db.Column(db.Integer, unique=True, nullable=True)
    is_active = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return '<User(Firstname=%s, Email=%s)>' % (self.first_name, self.email)


class EmployeeDepartmentMapping(Base):
    """ Model for Employee's Department """

    __tablename__ = 'employee_department_mapping'

    dept_id = db.Column(db.Integer, db.ForeignKey('department.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    db.UniqueConstraint(dept_id, user_id)

    def __repr__(self):
        return '<EmpDpt(DeptId=%d, EmpId=%d)>' % (self.dept_id, self.user_id)


class Task(Base):
    """ Model for Tasks """

    __tablename__ = 'task'

    task_title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    task_type = db.Column(db.Enum(TaskType))
    task_state = db.Column(db.Enum(TaskState))
    task_priority = db.Column(db.Enum(TaskPriority))
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'), nullable=False, unique=False)
    assignee_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True, unique=False)
    originator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, unique=False)

    def __repr__(self):
        return '<(TaskTitle=%s)>' % (self.task_title)


class Discussion(Base):
    """ Model for Discussion  """

    __tablename__ = 'discussion'

    discussion_text = db.Column(db.Text, nullable=True)
    originator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id', ondelete="CASCADE"), nullable=False)


class Attachment(Base):
    """ Model for Attachment  """

    __tablename__ = 'attachment'

    attachment_name = db.Column(db.Text, nullable=True)
    attachment_url = db.Column(db.Text, nullable=True)
    originator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id', ondelete="CASCADE"), nullable=False)

    def __repr__(self):
        return '<(Attachment URL=%r)>' % (self.attachment_url)


class ScreenerInfo(Base):
    """Stores info for department vs screener"""
    __tablename__ = 'screener_info'

    dept_id = db.Column(db.Integer, db.ForeignKey('department.id'), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)

    def __repr__(self):
        return '<ScreenerInfo(DeptId=%d, EmpId=%d)>' % (self.dept_id, self.emp_id)
