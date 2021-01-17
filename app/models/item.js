import Model, { attr, hasMany } from '@ember-data/model';

export default class ItemModel extends Model {
  @attr('string') content;
  @attr('string') contentType;
  @attr('string') fileUrl; // Used when fetching an item to display the file
  @attr('file') file; // Used when creating a new item to upload a file

  @hasMany('tag', { async: true }) tags;
}
