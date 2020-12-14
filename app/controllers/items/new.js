import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  content: validator('presence', true),
});

export default class ItemsNewController extends Controller.extend(Validations) {
  @service store;
  @service router;
  @service flashMessages;

  @tracked content;
  @tracked contentType = 'file';

  contentTypeOptions = ['text', 'link', 'file'];

  @action
  async onUploadFile(file) {
    console.log(file);
    this.content = file;
  }

  @task
  *onSubmit() {
    try {
      let contentType = this.contentType;
      let content = contentType === 'file' ? yield this.content.readAsDataURL() : this.content;

      let item = this.store.createRecord('item', { content, contentType });
      yield item.save();

      this.flashMessages.success('Item created');
    } catch (error) {
      this.flashMessages.danger('Item failed');
      console.log(error);
    }
  }

  @action
  onClose() {
    this.router.transitionTo('items');
  }
}
