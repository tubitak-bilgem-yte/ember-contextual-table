import FilterableColumn from './dt-filterable-column-base';

export default FilterableColumn.extend({
  tagName:'td',
  footer: true,
  classNames:['contextual-filterable-footer-cell']
});
