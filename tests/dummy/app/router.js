import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('basic-usage');
  this.route('overview');
  this.route('cell-customization');
  this.route('header-footer-customization');
  this.route('pagination');
  this.route('filtering');
  this.route('sorting');
  this.route('filter-and-sorting');
  this.route('installation');
  this.route('api-reference');
  this.route('col-resizable');
  this.route('row-detail-displaying');
  this.route('row-click');
});

export default Router;
