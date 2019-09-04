import Component from '@ember/component';

const DATA = [
  {option: 'body', type: 'boolean', description: 'It is returned as <code>true</code> for body part of the table, ' +
    'hence it is expected to be used in block form within an <code>if</code> check in order to put some content to the body ' +
    'cell(s).'},
  {option: 'footer', type: 'boolean', description: 'It is returned as <code>true</code> for footer part of the table, ' +
    'hence it is expected to be used in block form within an <code>if</code> check in order to put some content to the footer ' +
    'cell.'},
  {option: 'header', type: 'boolean', description: 'It is returned as <code>true</code> for header part of the table, ' +
    'hence it is expected to be used in block form within an <code>if</code> check in order to put some content to the header ' +
    'cell.'},
  {option: 'onfilterupdate', type: 'closure-action', description: 'Closure-action returned for triggering filtering operation ' +
    'in case a custom filtering component is being used. This attribute is only defined when either of <code>footer</code> ' +
    'or <code>header</code> attributes is <code>true</code>. The code snippets to fire this action are expected to fire with ' +
    'single parameter, that is <code>filterValue</code> to be used for filtering of related column.'},
  {option: 'row', type: 'json', description: 'It is the row that is being rendered. This attribute is only defined when ' +
    '<code>body</code> attribute is <code>true</code>; since it is only meaningful inside body when data is being iterated.'},
  {option: 'rowIndex', type: 'number', description: 'The index of the row that is being rendered. This attribute is only ' +
    'defined when <code>body</code> attribute is <code>true</code> just like <code>row</code>.'}
];

export default Component.extend({
  data: DATA
});
