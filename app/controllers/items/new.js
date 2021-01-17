import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';

export default class ItemsNewController extends Controller {
  @service store;
  @service router;
  @service flashMessages;

  @tracked content;
  @tracked file;
  @tracked contentType = 'text';

  contentTypeOptions = ['text', 'link', 'file'];

  @action
  onUploadFile(e) {
    this.file = e.target.files[0];
  }

  @task
  *onSubmit() {
    try {
      let { content, contentType, file } = this;

      let item = this.store.createRecord('item', { content, contentType, file });

      yield item.save();

      this.flashMessages.success('Item created');
    } catch (error) {
      this.flashMessages.danger('Item creation failed');
      console.log(error);
    }
  }

  @action
  onClose() {
    this.router.transitionTo('items');
  }
}
