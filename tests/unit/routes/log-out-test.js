import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | log-out', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:log-out');
    assert.ok(route);
  });
});
