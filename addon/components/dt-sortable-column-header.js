import SortableColumn from './dt-sortable-column-base';

export default SortableColumn.extend({
  tagName:'th',
  header: true,
  classNames:['contextual-sortable-header-cell']
});

