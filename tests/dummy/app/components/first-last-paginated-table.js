// BEGIN-SNIPPET first-last-paginated-table
import Component from '@ember/component';

export default Component.extend({
  tableClassNames:'table table-striped table-bordered table-hover yte-table-responsive table-condensed',

  actions:{
    selectionChanged:function(selectedRows){
      this.set('selectedRows', selectedRows);
    }
  }
});
// END-SNIPPET
