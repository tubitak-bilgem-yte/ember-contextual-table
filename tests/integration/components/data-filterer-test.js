import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import util from '../../util';

moduleForComponent('data-filterer', 'Integration | Component | data filterer', {
  integration: true,

  beforeEach() {
    this.set('data', util.data);
  }
});

test('it renders data as is without any filtering by default', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#data-filterer data=data as |ds|}}
      {{#each ds.data as |item|}}
        {{item.id}}     
      {{/each}}
    {{/data-filterer}}
  `);

  assertData(this.$(), assert, '3214', 'some filtering is performed unexpectedly');
});

test('it renders data wrt. name filtering', function(assert) {
  assert.expect(1);
  this.set('fieldFilters', [{fieldName: "name", filter:'oh'}]);

  this.render(hbs`
    {{#data-filterer data=data fieldFilters=fieldFilters as |ds|}}
      {{#each ds.data as |item|}}
        {{item.id}}     
      {{/each}}
    {{/data-filterer}}
  `);

  assertData(this.$(), assert, '324', 'only john named items should have been displayed');
});

test('it renders data wrt. filtering fields dynamically', function(assert) {
  assert.expect();

  this.set('fieldFilters', [{fieldName: "name", filter:'oh'}, {fieldName: "surname", filter:'d'}]);
  this.render(hbs`
    {{#data-filterer data=data fieldFilters=fieldFilters as |ds|}}
      {{#each ds.data as |item|}}
        {{item.id}}     
      {{/each}}
      <button id="button1" onclick={{action ds.onfilterfieldupdated 'surname' ''}}></button>
      <button id="button2" onclick={{action ds.onfilterfieldupdated 'name' ''}}></button>
      <button id="button3" onclick={{action ds.onfilterfieldupdated 'name' 'a'}}></button>
      <button id="button4" onclick={{action ds.onfilterfieldupdated 'name' 'an'}}></button>
    {{/data-filterer}}
  `);

  assertData(this.$(), assert, '32', 'only john named and doe surnamed items should have been displayed');
  this.$('#button1').click();
  assertData(this.$(), assert, '324', 'only john named items should have been displayed');
  this.$('#button2').click();
  assertData(this.$(), assert, '3214', 'all items should have been displayed');
  this.$('#button3').click();
  assertData(this.$(), assert, '1', 'only jack named items should have been displayed');
  this.$('#button4').click();
  assertData(this.$(), assert, '', 'no items should have been displayed');
});

test('it renders data wrt. custom filterer', function(assert) {
  assert.expect(2);

  this.set('fieldFilters',  [{fieldName: "name", filter:'oh'}, {fieldName: "surname", filter:'d'}]);
  this.set('filterer', util.customJackFilterer);
  this.render(hbs`
    {{#data-filterer data=data filterer=filterer fieldFilters=fieldFilters as |ds|}}
      {{#each ds.data as |item|}}
        {{item.id}}     
      {{/each}}
    {{/data-filterer}}
  `);

  assertData(this.$(), assert, '1', 'only jack named items should have been displayed');
  this.set('filterer', null);
  assertData(this.$(), assert, '32', 'only john named and doe surnamed items should have been displayed');
});

function assertData($, assert, expected, message) {
  assert.equal($.text().trim().replace(/\s/g, ''), expected, message);
}
