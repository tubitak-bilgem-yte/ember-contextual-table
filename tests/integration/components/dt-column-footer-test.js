import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dt-column-footer', 'Integration | Component | dt column footer', {
  integration: true
});

test('renders in block form', function(assert) {
  this.render(hbs`
    {{#dt-column-footer as |footer|}}
      Hash value is: {{footer.footer}}
    {{/dt-column-footer}}
  `);

  assert.equal(this.$().text().trim(), 'Hash value is: true');
});
