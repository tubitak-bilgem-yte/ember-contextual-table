import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dt-filterable-column-header', 'Integration | Component | dt filterable column header', {
  integration: true,
});

test('it renders an input for filtering in simple form', function(assert) {
  assert.expect(4);
  this.set('eventFireCount', 0);
  addEventListener.bind(this)(assert);
  this.render(hbs`{{dt-filterable-column-header filterinformationupdated=(action 'myAction') 
    propertyName="Name" filterValue=filterValue placeholder='Filter...'}}`);

  assert.equal(this.$('input').text().trim(), '', 'Filter text should have been initially empty');
  assert.equal(this.$('input').attr('placeholder'), 'Filter...', 'Placeholder should have been passed to the input');

  this.$('input').val('jack');
  this.$('input').change();

  this.set('filterValue', 'john');
});

test('it yields header true and corresponding action in block form', function(assert) {
  assert.expect(3);
  this.set('eventFireCount', 0);
  addEventListener.bind(this)(assert);
  this.render(hbs`
    {{#dt-filterable-column-header filterinformationupdated=(action 'myAction') as |fc|}}
      {{fc.header}}-{{fc.footer}}
      {{input key-up=(action fc.onfilterupdate)}}
    {{/dt-filterable-column-header}}
  `);

  assert.equal(this.$('th').text().trim(), 'true-', 'Yielded header should have been true and footer should have been undefined');

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

test('it yields header true but defaultHeader=true', function(assert) {

  this.render(hbs`
    {{#dt-filterable-column-header defaultHeader=true as |fc|}}
      This is some text for header
    {{/dt-filterable-column-header}}
  `);

  assert.equal(this.$('th').text().trim(), '', 'Yielded header should have been true and footer should have been undefined');
  assert.equal(this.$('th input').length, 1, 'There should be one input');
});
