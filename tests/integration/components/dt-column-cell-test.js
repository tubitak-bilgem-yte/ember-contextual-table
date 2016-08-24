import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dt-column-cell', 'Integration | Component | dt column cell', {
  integration: true,

  beforeEach() {
    this.set('row', {name:'Wesley',surname:'Sneijder'});
  }
});

test('renders in basic form', function(assert) {
  this.render(hbs`{{dt-column-cell row=row propertyName='name'}}`);

  assert.equal(this.$('td').text().trim(), 'Wesley');
});

test('renders in block form', function(assert) {
  this.render(hbs`
   {{#dt-column-cell row=row rowIndex=10 as |column|}}
     {{column.row.surname}}-{{column.rowIndex}}-{{column.body}}
   {{/dt-column-cell}}
   `);
  assert.equal(this.$('td').text().trim(), 'Sneijder-10-true');
});
