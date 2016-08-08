import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dt-column-header', 'Integration | Component | dt column header', {
  integration: true
});

test('renders in basic form', function(assert) {
  this.render(hbs`{{dt-column-header name='Player'}}`);

  assert.equal(this.$('th').text().trim(), 'Player');
});

test('renders in blok form with default header', function(assert) {
  this.render(hbs`
    {{#dt-column-header name="Player" defaultHeader=true as |header|}}
      This text will never be rendered! {{header.header}}
    {{/dt-column-header}}
  `);
  assert.equal(this.$('th').text().trim(), 'Player');
});

test('renders in blok form with custom header', function(assert) {
  this.render(hbs`
    {{#dt-column-header name="Player" as |header|}}
      This text will be rendered: {{header.header}}
    {{/dt-column-header}}
  `);
  assert.equal(this.$('th').text().trim(), 'This text will be rendered: true');
});
