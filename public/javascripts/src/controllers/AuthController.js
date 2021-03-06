const toastError = require('../helpers/toastConnectionError')
const CreateSnippet = require('../views/CreateSnippet')
const CreateProyect = require('../views/CreateProyect')
const ConfigPage = require('../views/Config')

module.exports = function(application) {
  return {
    /*
     * Controller for the user authenticated
     *
     * All functions should validate that the user
     * are logged
     * */
    logoutUserAction: function() {
      /*
       * Update Current User attributes,
       * remove token and redirect to auth
       * */
      if (!application.current_user.is_authenticated()) {
        return Backbone.history.navigate('auth', {trigger: true});
      }

      $.when(application.current_user.logout()).done(function(response) {
        $.toast({
          heading: 'Good bye.',
          text: response.response,
          icon: 'success',
          showHideTransition: 'slide',
          hideAfter: 1600
        });
        
        application.current_user.set({
          username: false,
          email: false,
          id: false,
          permission_level: 0
        });

        application.current_user.remove_token();

        Backbone.history.navigate('auth', {trigger: true});
      }).fail(function() {
        toastError(); // Show the toast error
      });
    },
    configUserPage: function () {
      /*
       * Show modal for update User
       * Information
       * */
      if (!application.current_user.is_authenticated()) {
        return Backbone.history.navigate('auth', {trigger: true});
      }

      application.showView(new ConfigPage({
        application: application
      }));
    },
    createProyectPage: function() {
      /*
       * Show modal for create Proyects
       * */
      if (!application.current_user.is_authenticated()) {
        return Backbone.history.navigate('auth', {trigger: true});
      }

      application.showView(new CreateProyect({
        application: application
      }));
    },
    createSnippetPage: function() {
      /*
       * Show modal for create Snippet
       * */
      if (!application.current_user.is_authenticated()) {
        return Backbone.history.navigate('auth', {trigger: true});
      }

      application.showView(new CreateSnippet({
        application: application
      }));
    }
  }
};