import Component from '@ember/component';

const DATA = [
  {option: 'data', type: 'array', description: 'Collection of items in original <code>data</code>, but sorted.'},
  {option: 'onsortfieldupdated', type: 'closure-action', description: 'A closure-action that is expected to be triggered ' +
    'whenever a sorting information for a field is changed. It expects following parameters in order:<ul><li><b>fieldName</b> : ' +
    'string type field, that is name of the field for which the sorting is to be performed</li><li><b>isAscending</b> : a ' +
    'boolean type value to indicate order of sorting; where <code>true</code> means ascending order, <code>false</code>. ' +
    'means descending order, and <code>undefined</code> means cancellation of sorting</li></ul>'}
];

export default Component.extend({
  data: DATA
});
