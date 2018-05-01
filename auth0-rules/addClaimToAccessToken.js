// After adding 'authorization.roles' array to app_metadata:

function (user, context, callback) {
  context.accessToken['http://petstoreapi/roles'] = user.app_metadata.authorization.roles;
  callback(null, user, context);
}
