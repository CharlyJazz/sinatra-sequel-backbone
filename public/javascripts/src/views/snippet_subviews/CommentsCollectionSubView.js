const Collection = require('../../collections/CommentsSnippet')
const EditModal = require('../ModalEdit')
const template = require('../../../../../views/application_sub_views/comment.erb');
const CollectionView = require('../CollectionViewBase');

module.exports = CollectionView.extend({
  className: 'row mt-3',
  ui: {
    editButton: '.ui-edit-comment',
    deleteButton: '.ui-delete'
  },
  events: {
    'click @ui.editButton': 'toggleModal',
    'click @ui.deleteButton': 'deleteComment'
  },
  collectionEvents: {
    'change': 'render'
  },
  initialize: function(options) {
    this.parent = options.parent;
    this.modal = undefined;

    var current_user = this.parent.getOption('application').current_user;

    this.childView = Mn.View.extend({
      template: template,
      className: 'col-lg-12',
      templateContext: function() {
        return {
          user_authenticated_is_the_owner: function(id_user) {
            return current_user.is_authenticated() && current_user.get('id') == id_user
          },
          comment_type: 'snippet'
        }
      }
    });
    this.collection = new Collection([], {
      idParent: options.idParent
    });
    this.collection.fetch();
  },
  toggleModal: function (event) {
    var id = $(event.currentTarget).data('id'),
        item = this.collection.get(id);

    this.parent.showChildView('editModalRegion', new EditModal({
      id: id,
      collection: this.collection,
      title: 'Edit your comment',
      fields: [
        {
          name: 'title',
          label: 'The title',
          value: item.get('title'),
          type: 'text',
          max: 120,
          required: false
        },
        {
          name:'body',
          label: 'The text body',
          value: item.get('body'),
          type: 'textarea',
          max: 24,
          required: true
        },
        {
          name: 'line_code',
          label: 'The line in the code editor',
          value: item.get('line_code'),
          type: 'number',
          max: this.parent.editor.lineCount(),
          required: false
        }
      ]
    }));
  },
  deleteComment: function (event) {
    this.collection.get(event.currentTarget.dataset.id).destroy()
  }
});