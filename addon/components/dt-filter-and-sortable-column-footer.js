import Component from '@ember/component';
import FilterAndSortableColumn from '../mixins/filter-and-sortable-column';

export default Component.extend(FilterAndSortableColumn, {
  tagName: 'td',
  footer: true,
  classNames: ['contextual-filter-and-sortable-footer-cell']
});
