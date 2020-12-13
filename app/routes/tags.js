/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class TagsRoute extends Route.extend(AuthenticatedRouteMixin) {
  async model() {
    let tags = this.store.findAll('tag');
    return { tags };
  }
}
