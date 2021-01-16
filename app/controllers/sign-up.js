import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency-decorators';
import { validator, buildValidations } from 'ember-cp-validations';
import { capitalize } from '@ember/string';

const Validations = buildValidations({
  email: [validator('presence', true), validator('format', { type: 'email' })],
  password: [
    validator('presence', true),
    validator('length', { min: 10, message: 'Password must be at least 10 characters long' }),
    validator('format', {
      regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      message: 'Password must include at least one upper case letter, one lower case letter, and a number',
    }),
  ],
  passwordConfirmation: validator('confirmation', { on: 'password' }),
});

export default class SignUpController extends Controller.extend(Validations) {
  @service session;
  @service router;
  @service flashMessages;

  @tracked email;
  @tracked password;
  @tracked passwordConfirmation;

  @task
  *onSubmit() {
    let user;
    try {
      let { email, password, passwordConfirmation } = this;

      user = this.store.createRecord('user', { email, password, passwordConfirmation });

      yield user.save();

      console.log(!!user.errors);

      this.flashMessages.success('Your account has been created.');

      user.password = null;
      user.passwordConfirmation = null;

      yield this.session.authenticate('authenticator:jwt', { email, password });

      this.router.transitionTo('items');
    } catch (e) {
      let message;

      if (user?.errors?.objectAt(0)) {
        let err = user.errors.objectAt(0);
        let attr = err.attribute;
        let problem = err.message;
        message = capitalize(`${attr} ${problem}`);
      } else {
        message = e.message || e.error.message || e.errors[0].title || 'There was an error. Please try again later.';
        console.log(e);
      }

      this.flashMessages.danger(message);
    }
  }
}
