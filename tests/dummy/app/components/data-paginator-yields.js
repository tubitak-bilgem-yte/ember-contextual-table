import Component from '@ember/component';

const DATA = [
  {option: 'currentPage', type: 'number', description: 'Current page the paginator is at. Starts from index 1.'},
  {option: 'data', type: 'array', description: 'Collection of items that paginated over the original <code>data</code> ' +
    'and available at the <code>currentPage</code>.'},
  {option: 'hasNext', type: 'boolean', description: 'A boolean flag to indicate whether any further page is available ' +
    'or not.'},
  {option: 'next', type: 'closure-action', description: 'A closure-action that is expected to be triggered to increment ' +
    'the <code>currentPage</code> so as to force reevaluation of <code>data</code> for pagination. No parameters are expected.'},
  {option: 'previous', type: 'closure-action', description: 'A closure-action that is expected to be triggered to decrement ' +
    'the <code>currentPage</code> so as to force reevaluation of <code>data</code> for pagination. No parameters are expected.'}
];

export default Component.extend({
  data: DATA
});
