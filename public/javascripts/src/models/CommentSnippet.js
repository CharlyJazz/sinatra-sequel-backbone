module.exports = Backbone.Model.extend({
  defaults: {
    created_at: Date.now(),
    title: '',
    line_code: '',
    user_picture: '',
    user_name: ''
  }
});