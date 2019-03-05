import { moduleForComponent, test } from 'ember-qunit';
import util from '../../util';

moduleForComponent('data-filterer', 'Unit | Component | data filterer');

test('Filtering by default returns in data itself', function(assert) {
  let component = this.subject({data: util.data});
  let filteredData = component.get('filteredData');
  let message = "Filtering by default";

  assert.expect(5);
  assert.equal(filteredData.length, 4);
  assertItemAtIndex(assert, filteredData, 0, 3, message);
  assertItemAtIndex(assert, filteredData, 1, 2, message);
  assertItemAtIndex(assert, filteredData, 2, 1, message);
  assertItemAtIndex(assert, filteredData, 3, 4, message);
});

test('Filtering with respect to single field', function(assert) {
  let component = this.subject({data: util.data, fieldFilters: [{fieldName: "name", filter:'oh'}]});
  let filteredData = component.get('filteredData');
  let message = "Filtering wrt. single field";

  assert.expect(4);
  assert.equal(filteredData.length, 3, 'Items with name other than John should have been filtered');
  assertItemAtIndex(assert, filteredData, 0, 3, message);
  assertItemAtIndex(assert, filteredData, 1, 2, message);
  assertItemAtIndex(assert, filteredData, 2, 4, message);
});

test('Filtering with respect to multiple fields', function(assert) {
  let component = this.subject({data: util.data, fieldFilters: [{fieldName: "name", filter:'oh'},
    {fieldName: "surname", filter:'d'}]});
  let filteredData = component.get('filteredData');
  let message = "Filtering wrt. multiple fields";

  assert.expect(3);
  assert.equal(filteredData.length, 2, 'Items with name other than John and surname Doe should have been filtered');
  assertItemAtIndex(assert, filteredData, 0, 3, message);
  assertItemAtIndex(assert, filteredData, 1, 2, message);
});

test('Filtering with respect to custom filterer', function(assert) {
  let component = this.subject({data: util.data, fieldFilters: [{fieldName: "name", filter:'oh'},
    {fieldName: "surname", filter:'d'}], filterer: util.customJackFilterer});
  let filteredData = component.get('filteredData');
  let message = "Filtering wrt. Jack filterer";

  assert.expect(2);
  assert.equal(filteredData.length, 1, 'Items with name other than Jack should have been filtered');
  assertItemAtIndex(assert, filteredData, 0, 1, message);
});

function assertItemAtIndex(assert, sortedData, index, expected, message) {
  assert.equal(sortedData[index].id, expected, `${message}: item's id at ${index} is not ${expected}`);
}
