// BEGIN-SNIPPET filtered-table
import Component from '@ember/component';

export default Component.extend({
  tableClassNames:'table table-striped table-bordered table-hover table-responsive table-condensed',

  actions:{
    selectionChanged:function(selectedRows){
      this.set('selectedRows', selectedRows);
    }
  }
});
// END-SNIPPET
