import Model, { attr } from '@ember-data/model';

export default class ItemModel extends Model {
  @attr('string') content;
}
