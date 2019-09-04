import Component from '@ember/component';

const DATA = [
  {option: 'currentPage', type: 'number', description: 'The current page, the pager component is to display.'},
  {option: 'nextDisabled', type: 'boolean', description: 'A boolean flag to indicate whether or not there is still page ' +
    'to display.'},
  {option: 'next', type: 'closure-action', description: 'A closure action to fire whenever next page is requested over ' +
    'pager. No parameters are expected for the action.'},
  {option: 'previous', type: 'closure-action', description: 'A closure action to fire whenever previous page is requested ' +
    'over pager. No parameters are expected for the action.'}
];

export default Component.extend({
  data: DATA
});
