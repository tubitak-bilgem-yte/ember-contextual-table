import Component from '@ember/component';
import FilterableColumn from '../mixins/filterable-column';

export default Component.extend(FilterableColumn, {
  tagName:'td',
  footer: true,
  classNames:['contextual-filterable-footer-cell']
});
