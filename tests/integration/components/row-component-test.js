import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('row-component', 'Integration | Component | row component', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{row-component}}`);

  assert.ok(this.$('tr'));
  assert.equal(this.$().text().trim(), '');

  this.set('row', 'A');
  this.set('rowIndex', 1);
  this.set('isRowSelected', true);
  // Template block usage:
  this.render(hbs`
    {{#row-component row=row rowIndex=rowIndex isRowSelected=isRowSelected as |rc|}}
      {{rc.row}}-{{rc.rowIndex}}-{{rc.isRowSelected}}
    {{/row-component}}
  `);

  assert.equal(this.$().text().trim(), 'A-1-true');
});
