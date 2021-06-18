import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import enum

app = Flask(__name__)
# Below is the set up for database where database=tms, db_password=password12, db_user=root, db_host=localhost
if not os.getenv("DATABASE_URL", None):
    raise Exception("DATABASE_URL not set in environment (mysql://username:password@localhost/tms")

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", None)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
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

    def __repr__(self):
        return '<Department Name  %r>' % self.department_name


class TaskType(enum.Enum):
    """ Model for Task Types """

    __tablename__ = 'task_type'
    QUESTION = "QUESTION"
    INCIDENT = "INCIDENT"
    PROBLEM = "PROBLEM"
    FEATURE_REQUEST = "FEATURE_REQUEST"
    REFUND = "REFUND"

    @staticmethod
    def from_task_type(string_val):
        mapping = {
            "QUESTION": TaskType.QUESTION,
            "INCIDENT": TaskType.INCIDENT,
            "PROBLEM": TaskType.PROBLEM,
            "FEATURE_REQUEST": TaskType.FEATURE_REQUEST,
            "REFUND": TaskType.REFUND
        }

        val = mapping.get(string_val)
        if not val:
            raise Exception("Task Type {} is not implemented".format(string_val))
        return val


class TaskPriority(enum.Enum):
    """ Model for Task Priority """

    __tablename__ = 'task_priority'
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    URGENT = "URGENT"

    @staticmethod
    def from_task_priority(string_val):
        mapping = {
            "LOW": TaskPriority.LOW,
            "MEDIUM": TaskPriority.MEDIUM,
            "HIGH": TaskPriority.HIGH,
            "URGENT": TaskPriority.URGENT
        }

        val = mapping.get(string_val)
        if not val:
            raise Exception("Priority {} is not implemented".format(string_val))
        return val


class TaskState(enum.Enum):
    """ Model for Task State """

    __tablename__ = 'task_state'
    SCREEN = "SCREEN"
    ASSIGNED = "ASSIGNED"
    RESOLVED = "RESOLVED"
    BLOCKED = "BLOCKED"
    UNBLOCKED = "UNBLOCKED"

    @staticmethod
    def from_task_state(string_val):
        mapping = {
            "SCREEN": TaskState.SCREEN,
            "ASSIGNED": TaskState.ASSIGNED,
            "RESOLVED": TaskState.RESOLVED,
            "BLOCKED": TaskState.BLOCKED,
            "UNBLOCKED": TaskState.UNBLOCKED
        }

        val = mapping.get(string_val)
        if not val:
            raise Exception("Task State {} is not implemented".format(string_val))

class Role(enum.Enum):
    """ Model for staff Role """

    __tablename__ = 'role'
    ADMIN = "ADMIN"
    REGULAR = "REGULAR"

    @staticmethod
    def from_str(string_val):
        mapping = {
            "ADMIN": Role.ADMIN, # full access.
            "REGULAR": Role.REGULAR # only read write access.
        }

        val = mapping.get(string_val)
        if not val:
            raise Exception("Role {} is not implemented".format(string_val))

        return val


class UserType(enum.Enum):
    """ Model for staff Role """

    __tablename__ = 'role'
    STUDENT = "STUDENT"
    EMPLOYEE = "EMPLOYEE"

    @staticmethod
    def from_str(string_val):
        mapping = {
            "STUDENT": Role.STUDENT,
            "EMPLOYEE": Role.EMPLOYEE
        }

        val = mapping.get(string_val)
        if not val:
            raise Exception("User Type {} is not implemented".format(string_val))

        return val


class User(Base):
    """ Model for User details """
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(200), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    role = db.Column(db.Enum(Role))
    user_type = db.Column(db.Enum(UserType))
    itu_id = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<User(Firstname=%s, Email=%s)>' % (self.first_name, self.email)



class EmployeeDepartmentMapping(Base):
    """ Model for Employee's Department """

    __tablename__ = 'employee_department_mapping'

    dept_id = db.Column(db.Integer, db.ForeignKey('department.id'), nullable=False)
    emp_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    db.UniqueConstraint(dept_id, emp_id)

    def __repr__(self):
        return '<EmpDpt(DeptId=%d, EmpId=%d)>' % (self.dept_id, self.emp_id)


class Task(Base):
    """ Model for Task """

    __tablename__ = 'task'

    task_title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    task_type = db.Column(db.Enum(TaskType))
    task_state = db.Column(db.Enum(TaskState))
    task_priority = db.Column(db.Enum(TaskPriority))
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'), nullable=False)
    assignee_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    originator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return '<(TaskTitle=%d)>' % (self.task_title)


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
    originator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    task_id = db.Column(db.Integer, db.ForeignKey('task.id', ondelete="CASCADE"), nullable=False)

    def __repr__(self):
        return '<(Attachment URL=%r)>' % (self.attachment_url)


class ScreenerInfo(Base):
    """Stores info for department vs screener"""
    __tablename__ = 'screener_info'

    dept_id = db.Column(db.Integer, db.ForeignKey('department.id'), unique=True, nullable=False)
    emp_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)

    def __repr__(self):
        return '<ScreenerInfo(DeptId=%d, EmpId=%d)>' % (self.dept_id, self.emp_id)
