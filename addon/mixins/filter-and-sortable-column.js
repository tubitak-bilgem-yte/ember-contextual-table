import Mixin from '@ember/object/mixin';
import FilterableColumn from './filterable-column';
import SortableColumn from './sortable-column';
import layout from '../templates/dt-filter-and-sortable-column';

export default Mixin.create(FilterableColumn, SortableColumn, {
  layout,
});
