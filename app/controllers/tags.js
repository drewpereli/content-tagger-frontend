import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency-decorators';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  newTagName: validator('presence', true),
});

export default class TagsController extends Controller.extend(Validations) {
  @service store;
  @service flashMessages;

  @tracked newTagName;

  @task
  *onNewTag() {
    let tag;
    try {
      tag = this.store.createRecord('tag', { name: this.newTagName });
      yield tag.save();
      this.flashMessages.success('Tag created');
    } catch (error) {
      console.log(error);
      this.flashMessages.danger('There was an error. Please try again later');
    }
  }
}
