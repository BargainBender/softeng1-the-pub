from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow GET, HEAD, and OPTIONS requests for everyone.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Allow POST requests if the user is the owner of the specified username.
        username = view.kwargs.get('username')
        return request.user.username == username

class IsStaffEditorPermission(permissions.DjangoModelPermissions):
  
  perms_map = {
      'GET': ['%(app_label)s.view_%(model_name)s'],
      'OPTIONS': [],
      'HEAD': [],
      'POST': ['%(app_label)s.add_%(model_name)s'],
      'PUT': ['%(app_label)s.change_%(model_name)s'],
      'PATCH': ['%(app_label)s.change_%(model_name)s'],
      'DELETE': ['%(app_label)s.delete_%(model_name)s'],
  }


  # def has_permission(self, request, view):
  #   if not request.user.is_staff:
  #     return False
  #   return super().has_permission(request, view)
  
  # def has_permission(self, request, view):
  #   user = request.user
  #   if user.is_staff:
  #     if user.has_perm("api.view_article"): # app_name.verb_model
  #       return True
  #     if user.has_perm("api.change_article"):
  #       return True
  #     if user.has_perm("api.add_article"):
  #       return True
  #     if user.has_perm("api.delete_article"):
  #       return True
  #     return False
  #   return False
  
  # def has_object_permission(self, request, view, obj):
    # obj.author == request.user ? do something

    # return super().has_object_permission(request, view, obj)