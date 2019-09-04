import Component from '@ember/component';

const DATA = [
  {option: 'data', type: 'array', description: 'Collection of items to be sorted.'},
  {option: 'sorter', type: 'function', description: 'Function to be invoked to perform sorting operation. Function ' +
    'should expect the following parameters:<ul><li><b>data</b> : array of items to be sorted</li><li><b>sortingFields</b>' +
    ' : array of json objects, where each object has a <code>name</code> attribute that indicates name of the field being ' +
    'sorted and a boolean flag <code>isAscending</code>; where <code>true</code> means ascending order, <code>false</code>. ' +
    'means descending order, and <code>undefined</code> means cancellation of sorting</li></ul>'}
];

export default Component.extend({
  data: DATA
});
