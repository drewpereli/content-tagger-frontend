import Model, { attr, hasMany } from '@ember-data/model';

export default class TagModel extends Model {
  @attr('string') name;

  @hasMany('item', { async: true, inverse: null }) items;
}
