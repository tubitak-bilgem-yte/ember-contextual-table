import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dt-sortable-column-header', 'Integration | Component | dt sortable column header', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{dt-sortable-column-header}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#dt-sortable-column-header}}
      template block text
    {{/dt-sortable-column-header}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
