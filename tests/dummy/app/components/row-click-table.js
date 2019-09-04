// BEGIN-SNIPPET row-click-table
import Component from '@ember/component';

import { get, set } from '@ember/object';

export default Component.extend({
  tableClassNames:'table table-striped table-bordered table-hover table-responsive table-condensed',

  actions:{
    onRowSingleClick(row) {
      set(row, 'clickCount', (get(row, 'clickCount') || 0) + 1);
    },
    onRowDoubleClick(row) {
      set(row, 'doubleClickCount', (get(row, 'doubleClickCount') || 0) + 1);
    }
  }
});
// END-SNIPPET
