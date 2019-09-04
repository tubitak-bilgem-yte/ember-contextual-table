// BEGIN-SNIPPET custom-filtered-table
import Component from '@ember/component';

import { isEmpty } from '@ember/utils';
import { get, computed } from '@ember/object';

const POSITIONS = ['Guard', 'Forward', 'Center'];

export default Component.extend({
  tableClassNames:'table table-striped table-bordered table-hover table-responsive table-condensed',
  positions: POSITIONS,

  filteredData: computed('data', 'selectedPosition', function () {
    if (isEmpty(this.get('selectedPosition'))) {
      return this.get('data');
    }

    return this.get('data').filter((item)=>{
      return get(item, 'position') === this.get('selectedPosition');
    });
  }),

  actions:{
    selectionChanged: function(selectedRows){
      this.set('selectedRows', selectedRows);
    }
  }
});
// END-SNIPPET
