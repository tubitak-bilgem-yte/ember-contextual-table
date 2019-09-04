import Component from '@ember/component';

const DATA = [
  {option: 'deselected', type: 'closure-action', description: 'The action to fire to trigger deselection of all rows of ' +
    'table. Code snippets to fire this action are expected to call without any parameters.'},
  {option: 'isSelected', type: 'boolean', description: 'The flag to show whether all the rows of the table are selected ' +
    'or not.'},
  {option: 'selected', type: 'closure-action', description: 'The action to fire to trigger selection of all rows of ' +
    'table. Code snippets to fire this action are expected to call without any parameters.'},
];

export default Component.extend({
  data: DATA
});
