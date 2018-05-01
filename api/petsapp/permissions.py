from rest_framework import permissions

SAFE_METHODS = ['GET', 'HEAD', 'OPTIONS']
EDITOR_METHODS = ['POST', 'PATCH', 'PUT']
ADMIN_METHODS = ['DELETE']

class IsEditorAdminOrReadOnly(permissions.BasePermission):
  """
  Custom permissions by request method based on user group.
  """

  def has_permission(self, request, view):
    if (request.method in SAFE_METHODS):
      return True
    if (request.method in EDITOR_METHODS and 
      (request.user.groups.filter(name='editor').exists() or request.user.groups.filter(name='admin').exists())):
      return True
    if (request.method in ADMIN_METHODS and request.user.groups.filter(name='admin').exists()):
      return True
    return False