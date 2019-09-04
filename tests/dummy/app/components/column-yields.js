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
  {option: 'row', type: 'json', description: 'It is the row that is being rendered. This attribute is only defined when ' +
    '<code>body</code> attribute is <code>true</code>; since it is only meaningful inside body when data is being iterated.'},
  {option: 'rowIndex', type: 'number', description: 'The index of the row that is being rendered. This attribute is only ' +
    'defined when <code>body</code> attribute is <code>true</code> just like <code>row</code>.'}
];

export default Component.extend({
  data: DATA
});
