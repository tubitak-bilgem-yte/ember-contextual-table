import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import util from '../../util';

moduleForComponent('data-sorter', 'Integration | Component | data sorter', {
  integration: true,

  beforeEach() {
    this.set('data', util.data);
  }
});

test('it renders data as is without any sorting by default', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#data-sorter data=data as |ds|}}
      {{#each ds.data as |item|}}
        {{item.id}}     
      {{/each}}
    {{/data-sorter}}
  `);

  assertOrderOfData(this.$(), assert, '3214', 'some sorting is performed unexpectedly');
});

test('it renders data wrt. id sorted', function(assert) {
  assert.expect(1);

  this.set('sortFields', ['id']);
  this.render(hbs`
    {{#data-sorter data=data sortFields=sortFields as |ds|}}
      {{#each ds.data as |item|}}
        {{item.id}}     
      {{/each}}
    {{/data-sorter}}
  `);

  assertOrderOfData(this.$(), assert, '1234', 'sorting with respect to id failed');
});

test('it renders data wrt. sorting multiple fields dynamically', function(assert) {
  assert.expect(4);

  this.set('sortFields', ['name:asc']);
  this.render(hbs`
    {{#data-sorter data=data sortFields=sortFields as |ds|}}
      {{#each ds.data as |item|}}
        {{item.id}}     
      {{/each}}
      <button id="button1" onclick={{action ds.onsortfieldupdated 'surname' false}}></button>
      <button id="button2" onclick={{action ds.onsortfieldupdated 'surname'}}></button>
      <button id="button3" onclick={{action ds.onsortfieldupdated 'id' true}}></button>
    {{/data-sorter}}
  `);

  assertOrderOfData(this.$(), assert, '1324', 'sorting with name-ascending failed');
  this.$('#button1').click();
  assertOrderOfData(this.$(), assert, '1432', 'sorting with respect to name-ascending & surname-descending failed');
  this.$('#button2').click();
  assertOrderOfData(this.$(), assert, '1324', 'sorting with respect to name-ascending after surname removed from sort fields failed');
  this.$('#button3').click();
  assertOrderOfData(this.$(), assert, '1234', 'sorting with respect to name-ascending & id-ascending failed');
});

test('it renders data wrt. custom comparator no matter what sort fields are', function(assert) {
  assert.expect(2);

  this.set('sortFields', ['name:asc']);
  this.set('comparator', util.customComparator);

  this.render(hbs`
    {{#data-sorter data=data comparator=comparator sortFields=sortFields as |ds|}}
      {{#each ds.data as |item|}}
        {{item.id}}     
      {{/each}}
    {{/data-sorter}}
  `);

  assertOrderOfData(this.$(), assert, '2431', 'sorting with respect to custom comparator failed');
  this.set('comparator', null);
  assertOrderOfData(this.$(), assert, '1324', 'sorting with name-ascending after custom comparator removal failed');
});

function assertOrderOfData($, assert, expected, message) {
  assert.equal($.text().trim().replace(/\s/g, ''), expected, message);
}
