import { moduleForComponent, test } from 'ember-qunit';
import util from '../../util';

moduleForComponent('data-filterer', 'Unit | Component | data filterer', {
  unit: true
});

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
  let component = this.subject({data: util.data, filterFields: [{fieldName: "name", filter:'oh'}]});
  let filteredData = component.get('filteredData');
  let message = "Filtering wrt. single field";

  assert.expect(4);
  assert.equal(filteredData.length, 3);
  assertItemAtIndex(assert, filteredData, 0, 3, message);
  assertItemAtIndex(assert, filteredData, 1, 2, message);
  assertItemAtIndex(assert, filteredData, 2, 4, message);
});

function assertItemAtIndex(assert, sortedData, index, expected, message) {
  assert.equal(sortedData[index].id, expected, `${message}: item's id at ${index} is not ${expected}`);
}
/*
test('Sorting with respect to single field results in ascending order', function(assert) {
  let component = this.subject({data: util.data, sortFields: ["id"]});
  let sortedData = component.get('sortedData');
  let message = "Sorting wrt. single field in ascending order";

  assert.expect(5);
  assert.equal(sortedData.length, 4);
  assertItemAtIndex(assert, sortedData, 0, 1, message);
  assertItemAtIndex(assert, sortedData, 1, 2, message);
  assertItemAtIndex(assert, sortedData, 2, 3, message);
  assertItemAtIndex(assert, sortedData, 3, 4, message);
});

test('Sorting with respect to multiple fields both descending & ascending', function(assert) {
  let component = this.subject({data: util.data, sortFields: ["name:desc", "surname:asc"]});
  let sortedData = component.get('sortedData');
  let message = "Sorting wrt. multiple fields name-descending & surname-ascending";

  assert.expect(5);
  assert.equal(sortedData.length, 4);
  assertItemAtIndex(assert, sortedData, 0, 3, message);
  assertItemAtIndex(assert, sortedData, 1, 2, message);
  assertItemAtIndex(assert, sortedData, 2, 4, message);
  assertItemAtIndex(assert, sortedData, 3, 1, message);
});

test('Sorting with custom comparator function overrides sort fields', function(assert) {
  let component = this.subject({data: util.data, sortFields: ["name:desc", "surname:asc"], comparator: util.customComparator});
  let sortedData = component.get('sortedData');
  let message = "Sorting wrt. custom comparator ";

  assert.expect(5);
  assert.equal(sortedData.length,4);
  assertItemAtIndex(assert, sortedData, 0, 2, message);
  assertItemAtIndex(assert, sortedData, 1, 4, message);
  assertItemAtIndex(assert, sortedData, 2, 3, message);
  assertItemAtIndex(assert, sortedData, 3, 1, message);
});

function assertItemAtIndex(assert, sortedData, index, expected, message) {
  assert.equal(sortedData[index].id, expected, `${message}: item's id at ${index} is not ${expected}`);
}
*/
