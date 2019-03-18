import Component from '@ember/component';
import FilterableColumn from '../mixins/filterable-column';

export default Component.extend(FilterableColumn, {
  tagName:'th',
  header: true,
  classNames:['contextual-filterable-header-cell']
});
