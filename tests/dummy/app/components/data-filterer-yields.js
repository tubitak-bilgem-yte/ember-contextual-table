import Component from '@ember/component';

const DATA = [
  {option: 'data', type: 'array', description: 'Collection of items filtered over the original <code>data</code>.'},
  {option: 'onfilterfieldupdated', type: 'closure-action', description: 'A closure-action that is expected to be triggered ' +
    'whenever a filter for a field is changed. It expects following parameters in order:<ul><li><b>fieldName</b> : ' +
    'string type field, that is name of the field for which the filtering is to be performed</li><li><b>filter</b> : an ' +
    'object type value that is to be used for filtering. <code>undefined</code> is expected when the filtering for related ' +
    'field is to be cancelled</li></ul>'}
];

export default Component.extend({
  data: DATA
});
