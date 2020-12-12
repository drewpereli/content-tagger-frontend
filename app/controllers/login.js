import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  email: validator('presence', true),
  password: validator('presence', true),
});

export default class LoginController extends Controller.extend(Validations) {
  @service session;
  @service router;
  @service flashMessages;

  @tracked email;
  @tracked password;

  @task
  *onSubmit() {
    try {
      let { email, password } = this;

      yield this.session.authenticate('authenticator:jwt', { email, password });

      this.router.transitionTo('items');
    } catch (error) {
      if (error.status === 401) {
        this.flashMessages.danger('Invalid email or password');
      } else {
        this.flashMessages.danger('There was an error. Please try again later.');
        console.log(error);
      }
    }
  }
}
