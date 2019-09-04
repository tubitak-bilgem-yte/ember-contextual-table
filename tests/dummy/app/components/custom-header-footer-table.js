// BEGIN-SNIPPET custom-header-footer-table
import { computed, get } from '@ember/object';

import { A } from '@ember/array';
import Component from '@ember/component';

export default Component.extend({
  tableClassNames:'table table-striped table-bordered table-hover table-responsive table-condensed',
  selectedRows: A(),
  currentYear: new Date().getFullYear(),
  ages: computed('selectedRows.[]', function () {
    return this.get('selectedRows').map((item)=>{
      return this.get('currentYear')-get(item, 'birthYear');
    });
  }),
  avgAge:computed('ages', function(){
    if (this.get('ages').length === 0) {
      return '-';
    }

    let sum = this.get('ages').reduce(function(a, b) { return a + b; });
    return sum / this.get('ages').length;
  }),

  actions:{
    selectionChanged:function(selectedRows){
      this.set('selectedRows', selectedRows);
    }
  }
});
// END-SNIPPET
