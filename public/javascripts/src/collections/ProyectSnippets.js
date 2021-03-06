const Model = require('../models/Snippet')

module.exports = Backbone.Collection.extend({
  model: Model,
  url: function() {
    return  '/api/proyect/' + this.idParent + '/snippet'
  },
  initialize: function (models, options) {
    this.idParent = options.idParent;
  },
  removeSnippet: function (id, token) {
    /*
    * Remove snippet from the proyect
    * */
    return $.ajax({
      type: 'DELETE',
      url: this.url() + '/' + id,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer '.concat(token))
      }
    });
  }
});