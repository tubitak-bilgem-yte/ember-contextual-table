import FilterableColumn from './dt-filterable-column-base';

export default FilterableColumn.extend({
  tagName:'th',
  header: true,
  classNames:['contextual-filterable-header-cell']
});
