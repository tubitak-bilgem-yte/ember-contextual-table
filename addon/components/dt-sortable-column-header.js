import Component from '@ember/component';
import SortableColumn from '../mixins/sortable-column';

export default Component.extend(SortableColumn, {
  tagName:'th',
  header: true,
  classNames:['contextual-sortable-header-cell']
});

