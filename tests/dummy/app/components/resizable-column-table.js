// BEGIN-SNIPPET resizable-column-table
import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  tableClassNames:'table table-striped table-bordered table-hover yte-table-responsive table-condensed',

  didInsertElement(){
    $(".contextual-data-table").colResizable({
      liveDrag:true,
      draggingClass:"dragging"
    });
  }
});
// END-SNIPPET
