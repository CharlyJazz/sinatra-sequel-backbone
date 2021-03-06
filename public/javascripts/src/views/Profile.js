const ProyectsCollectionSubView = require('./profile_subviews/ProyectsCollectionSubView')
const SnippetsCollectionSubView = require('./profile_subviews/SnippetsCollectionSubView')
const ChartsSubView = require('./profile_subviews/ChartsSubView')
const template = require('../../../../views/application_views/profile.erb');

module.exports = Mn.View.extend({
  template: template,
  regions: {
    snippetsRegion: '#snippets-region',
    proyectsRegion: '#proyects-region',
    chartsRegion: '#charts-region'
  },
  modelEvents: {
    'sync': 'renderRegions'
  },
  childViewEvents: {
    'noHaveSnippets': 'hiddenSnippetHTML',
    'noHaveProyects': 'hiddenProyectHTML'
  },
  ui: {
    'title_snippets_block': 'h1#title-popular-snippets',
    'anchor_snippets_block': 'a#anchor-popular-snippets',
    'title_proyects_block': 'h1#title-popular-proyects',
    'anchor_proyects_block': 'a#anchor-popular-proyects'
  },
  initialize: function () {
    this.user_id = this.model.id;
  },
  renderRegions: function () {
    this.showChildView('snippetsRegion', new SnippetsCollectionSubView({
      user_id: this.user_id
    }));
    this.showChildView('proyectsRegion', new ProyectsCollectionSubView({
      user_id: this.user_id
    }));
    this.showChildView('chartsRegion', new ChartsSubView({
      user_id: this.user_id
    }));
  },
  hiddenSnippetHTML: function () {
    this.getUI('title_snippets_block').fadeOut(300);
    this.getUI('anchor_snippets_block').fadeOut(300);
  },
  hiddenProyectHTML: function () {
    this.getUI('title_proyects_block').fadeOut(300);
    this.getUI('anchor_proyects_block').fadeOut(300);
  }
});