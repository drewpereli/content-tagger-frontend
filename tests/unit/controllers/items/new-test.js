import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | items/new', function(hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:items/new');
    assert.ok(controller);
  });
});
