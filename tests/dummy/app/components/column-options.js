import Component from '@ember/component';

const DATA = [
  {option: 'defaultHeader', type: 'boolean', description: 'When truthy, a default header will be rendered with value ' +
    'of <code>name</code> property as the header.'},
  {option: 'name', type: 'string', description: 'The value to render as column header if <code>defaultHeader</code> ' +
    'is assigned true.'},
  {option: 'propertyName', type: 'string', description: 'The property to be extracted from the row and will be rendered ' +
    'as content of body cell in case the component is being used in basic form (not in block form).'}
];

export default Component.extend({
  data: DATA
});
