/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default class LogOutRoute extends Route.extend(AuthenticatedRouteMixin) {
  @service session;

  beforeModel() {
    this.session.invalidate();
    this.transitionTo('login');
  }
}
