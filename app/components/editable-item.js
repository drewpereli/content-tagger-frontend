import Component from '@glimmer/component';
import { action } from '@ember/object';

/**
 * @param {Item} item
 * @param {Tag[]} allTags
 */
export default class EditableItemComponent extends Component {
  get addableTags() {
    let itemTagIds = this.args.item.tags.mapBy('id');

    return this.args.allTags.reject((tag) => itemTagIds.includes(tag.id));
  }

  @action
  addTag(tag) {
    this.args.item.tags.pushObject(tag);
    this.args.item.save();
  }

  @action
  removeTag(tag) {
    this.args.item.tags.removeObject(tag);
    this.args.item.save();
  }
}
