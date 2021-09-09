import os, sys

_CURRDIR = os.path.dirname(__file__)
_APPDIR = os.path.join(_CURRDIR, "..")
sys.path.append(_APPDIR)

from flask_marshmallow import Marshmallow
from marshmallow_enum import EnumField
from marshmallow import Schema, fields
from models import app
from models import User, Role, UserType, Department, TaskType, TaskState, TaskPriority, Task, EmployeeDepartmentMapping

ma = Marshmallow(app)


class DepartmentSchema(ma.Schema):
    class Meta:
        model = Department
        ordered = True
        fields = ('id', 'department_name', 'department_email')


department_schema = DepartmentSchema(many=True)


class UserSchema(ma.Schema):
    role = EnumField(Role, by_value=True)
    user_type = EnumField(UserType, by_value=True)

    class Meta:
        model = User
        ordered = True
        fields = ('first_name', 'last_name', 'email', 'role', 'user_type', 'employee_id', 'student_id', 'is_active')


user_schema = UserSchema(many=True)


class TaskSchema(ma.Schema):
    task_type = EnumField(TaskType, by_value=True)
    task_state = EnumField(TaskState, by_value=True)
    task_priority = EnumField(TaskPriority, by_value=True)

    class Meta:
        model = Task
        ordered = True
        fields = ('task_title', 'description', 'task_type', 'task_state', 'task_priority', 'department_id',
                  'originator_id')


task_schema = TaskSchema(many=True)
