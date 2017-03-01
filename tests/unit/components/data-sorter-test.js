import { moduleForComponent, test } from 'ember-qunit';
import util from '../../util';

moduleForComponent('data-sorter', 'Unit | Component | data sorter', {
  unit: true
});

test('Sorting by default returns in data itself', function(assert) {
  let component = this.subject({data: util.data});
  let sortedData = component.get('sortedData');
  let message = "Sorting by default";

  assert.expect(5);
  assert.equal(sortedData.length, 4);
  assertItemAtIndex(assert, sortedData, 0, 3, message);
  assertItemAtIndex(assert, sortedData, 1, 2, message);
  assertItemAtIndex(assert, sortedData, 2, 1, message);
  assertItemAtIndex(assert, sortedData, 3, 4, message);
});

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
  let component = this.subject({data: util.data, sortFields: ["name:desc", "surname:asc"], sorter: util.customSorter});
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
