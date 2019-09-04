import Component from '@ember/component';

const DATA = [
  {option: 'column', type: 'contextual component', description: 'A basic column component that is yielded from header, ' +
    'body, and footer parts of the table. It will display a title for the header, the value of extracted property from the ' +
    'row as body; and nothing for the footer by default. See below for details of yielded <i>column</i> component.'},
  {option: 'filterableColumn', type: 'contextual component', description: 'A filterable column component that is yielded ' +
    'from header, body, and footer parts of the table. It will display an input to filter for the header, the value of extracted ' +
    'property from the row as body; and an input to filter for the footer by default. See below for details of yielded <i>filterableColumn</i> ' +
    'component.'},
  {option: 'selectionColumn', type: 'contextual component', description: 'A selection column component that is yielded ' +
    'from header, body, and footer parts of the table. It will display a checkbox for the header to select all rows, a checkbox ' +
    'to select individual row for body; a checkbox for the footer to select all rows by default. See below for details of ' +
    'yielded <i>selectionColumn</i> component.'},
  {option: 'sortableColumn', type: 'contextual component', description: 'A sortable column component that is yielded ' +
    'from header, body, and footer parts of the table. It will display a clickable component to change sorting mod for the ' +
    'header, the value of extracted property from the row as body; and a clickable component to change sorting mod for the ' +
    'footer by default. See below for details of yielded <i>filterableColumn</i> component.'},
];

export default Component.extend({
  data: DATA
});
