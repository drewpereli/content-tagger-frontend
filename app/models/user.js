import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') email;

  @attr('string') password; // Just used for signup
  @attr('string') passwordConfirmation; // Just used for signup
}
