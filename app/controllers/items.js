import Controller from '@ember/controller';

export default class ItemsController extends Controller {
  get items() {
    return this.model.items;
  }
}
