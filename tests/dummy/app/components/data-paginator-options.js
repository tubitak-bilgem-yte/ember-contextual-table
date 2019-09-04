import Component from '@ember/component';

const DATA = [
  {option: 'data', type: 'array', description: 'Collection of items to be paginated.'},
  {option: 'pageSize', type: 'number', description: 'Number of items to be displayed per page.'}
];

export default Component.extend({
  data: DATA
});
