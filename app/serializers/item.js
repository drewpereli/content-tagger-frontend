import ApplicationSerializer from './application';

export default class ItemSerializer extends ApplicationSerializer {
  serializeHasMany(snapshot, json, relationship) {
    let key = relationship.key;
    if (key === 'tags') {
      json.tag_ids = snapshot.hasMany('tags', { ids: true });
    } else {
      super.serializeHasMany(...arguments);
    }
  }
}
