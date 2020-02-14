// BEGIN-SNIPPET custom-footer-table
import { sum, mapBy, uniq } from '@ember/object/computed';

import { computed, get } from '@ember/object';
import { A } from '@ember/array';
import Component from '@ember/component';

export default Component.extend({
  selectedRows: A(),
  tableClassNames:'table table-striped table-bordered table-hover yte-table-responsive table-condensed',
  currentYear: new Date().getFullYear(),
  ages: computed('selectedRows.[]', function () {
    return this.get('selectedRows').map((item)=>{
      return this.get('currentYear')-get(item, 'birthYear');
    });
  }),
  totalAges: sum('ages'),
  teams: mapBy('selectedRows', 'team'),
  distinctTeams:uniq('teams'),

  actions:{
    selectionChanged:function(selectedRows){
      this.set('selectedRows', selectedRows);
    }
  }
});
// END-SNIPPET
