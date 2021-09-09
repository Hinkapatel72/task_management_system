'''
Custom service excpetions.
'''
class TMSException(Exception):
    pass

class UnauthorizedUserException(TMSException):
    pass

class DuplicateEntryException(TMSException):
    pass

class TimeoutException(TMSException):
    pass

class CreateNewItemException(TMSException):
    pass

class QueryException(TMSException):
    pass

class InvalidInputException(TMSException):
    pass

class ItemNotFoundException(TMSException):
    pass

class UpdateException(TMSException):
    pass

class DeleteException(TMSException):
    pass

class UserInactiveException(TMSException):
    pass
