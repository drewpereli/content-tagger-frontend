/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default class ItemsRoute extends Route.extend(AuthenticatedRouteMixin) {
  async model() {
    let [items, tags] = await Promise.all([this.store.findAll('item'), this.store.findAll('tag')]);

    return { items, tags };
  }
}
