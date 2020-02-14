// BEGIN-SNIPPET advanced-sorted-table
import Component from '@ember/component';

import { isEmpty } from '@ember/utils';
import { get } from '@ember/object';
const POSITION_ORDER = {"Center": 2, "Guard": 1, "Forward": 0};

function nameComparator(a, b) {
  return get(a, 'name').length - get(b, 'name').length;
}

function positionComparator(a, b) {
  return POSITION_ORDER[get(a, 'position')] - POSITION_ORDER[get(b, 'position')];
}


export default Component.extend({
  tableClassNames:'table table-striped table-bordered table-hover yte-table-responsive table-condensed',

  customSorter(data, sortFields) {
    if (isEmpty(sortFields)) {
      return data;
    }

    return data.sort(function (a, b) {
      for (const sortField of sortFields) {
        let result = 0;
        let fieldName = get(sortField, 'fieldName');
        let coefficient = get(sortField, 'isAscending') ? 1 : -1;

        if (fieldName === 'name') {
          result = nameComparator(a, b);
        } else if (fieldName === 'position') {
          result = positionComparator(a, b);
        }

        if (result !== 0) {
          return result * coefficient;
        }
      }

      return 0;
    });
  },

  actions:{
    selectionChanged:function(selectedRows){
      this.set('selectedRows', selectedRows);
    }
  }
});
// END-SNIPPET
