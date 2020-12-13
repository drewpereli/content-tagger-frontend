import EmberRouter from '@ember/routing/router';
import config from 'content-tagger/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('items', function() {
    this.route('new');
  });
  this.route('sign-up');
  this.route('log-out');
  this.route('tags', function() {});
});
