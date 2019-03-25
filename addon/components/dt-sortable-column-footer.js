import Component from '@ember/component';
import SortableColumn from '../mixins/sortable-column';

export default Component.extend(SortableColumn, {
  tagName:'td',
  footer:true,
  classNames:['contextual-sortable-footer-cell']
});
