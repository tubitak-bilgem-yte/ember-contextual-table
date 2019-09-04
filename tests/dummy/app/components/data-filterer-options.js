import Component from '@ember/component';

const DATA = [
  {option: 'data', type: 'array', description: 'Collection of items to be filtered.'},
  {option: 'filterer', type: 'function', description: 'Function to be invoked to perform filtering operation. Function ' +
    'should expect the following parameters:<ul><li><b>data</b> : array of items to be filtered</li><li><b>filterFields</b>' +
    ' : array of json objects, where each object has a <code>name</code> attribute that indicates name of the field being ' +
    'filtered and a <code>filter</code> value for which filtering to be performed</li></ul>'}
];

export default Component.extend({
  data: DATA
});
