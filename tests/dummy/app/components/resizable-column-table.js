// BEGIN-SNIPPET resizable-column-table
import Component from '@ember/component';

export default Component.extend({
  tableClassNames:'table table-striped table-bordered table-hover table-responsive table-condensed',

  didInsertElement(){
    this.$(".contextual-data-table").colResizable({
      liveDrag:true,
      draggingClass:"dragging"
    });
  }
});
// END-SNIPPET
