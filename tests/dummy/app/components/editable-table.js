// BEGIN-SNIPPET editable-table
import Component from '@ember/component';

import { get, set } from '@ember/object';

export default Component.extend({
  tableClassNames:'table table-striped table-bordered table-hover table-responsive table-condensed',

  actions:{
    onnickupdate(row, newNick) {
      set(row, 'previousNick', get(row, 'nick'));
      set(row, 'nick', newNick);
    }
  }
});
// END-SNIPPET
