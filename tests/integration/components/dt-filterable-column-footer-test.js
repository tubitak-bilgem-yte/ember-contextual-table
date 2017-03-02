import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dt-filterable-column-footer', 'Integration | Component | dt filterable column footer', {
  integration: true,
});

test('it renders an input for filtering in simple form', function(assert) {
  assert.expect(4);
  this.set('eventFireCount', 0);
  addEventListener.bind(this)(assert);
  this.render(hbs`{{dt-filterable-column-footer filterinformationupdated=(action 'myAction') filterValue=filterValue placeholder='Filter...'}}`);

  assert.equal(this.$('input').text().trim(), '', 'Filter text should have been initially empty');
  assert.equal(this.$('input').attr('placeholder'), 'Filter...', 'Placeholder should have been passed to the input');

  this.$('input').val('jack');
  this.$('input').change();

  this.set('filterValue', 'john');
});

test('it yields footer true and corresponding action in block form', function(assert) {
  assert.expect(3);
  this.set('eventFireCount', 0);
  addEventListener.bind(this)(assert);
  this.render(hbs`
    {{#dt-filterable-column-footer filterinformationupdated=(action 'myAction') as |fc|}}
      {{fc.header}}-{{fc.footer}}
      {{input key-up=(action fc.onfilterupdate)}}
    {{/dt-filterable-column-footer}}
  `);

  assert.equal(this.$('td').text().trim(), '-true', 'Yielded header should have been undefined and footer should have been true');

  this.$('input').val('jack');
  this.$('input').keyup();

  this.$('input').val('john');
  this.$('input').keyup();
});

function addEventListener(assert) {
  this.on('myAction', function(fieldName, filterValue){
    let eventFireCount = this.get('eventFireCount') + 1;
    this.set('eventFireCount', eventFireCount);

    if (eventFireCount === 1) {
      assert.equal(filterValue, 'jack', 'First search term should have been jack');
    } else if (eventFireCount === 2) {
      assert.equal(filterValue, 'john', 'Second search term should have been john');
    }
  });
}
