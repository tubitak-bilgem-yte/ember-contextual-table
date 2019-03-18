import Component from '@ember/component';
import FilterAndSortableColumn from '../mixins/filter-and-sortable-column';

export default Component.extend(FilterAndSortableColumn, {
  tagName: 'th',
  header: true,
  classNames: ['contextual-filter-and-sortable-header-cell']
});
