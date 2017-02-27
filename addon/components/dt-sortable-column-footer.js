import SortableColumn from './dt-sortable-column-base';

export default SortableColumn.extend({
  tagName:'td',
  footer:true,
  classNames:['contextual-sortable-footer-cell']
});
