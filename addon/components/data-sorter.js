import { A } from '@ember/array';
import Component from '@ember/component';
import { isEmpty } from '@ember/utils';
import { get, computed } from '@ember/object';
import layout from '../templates/data-sorter';

function internalSorter(data, sortFields) {

  if (isEmpty(sortFields)) {
    return data;
  }

  let internalComparator = new InternalComparator(sortFields);
  data.sort(internalComparator.compare);

  return data;
}

function InternalComparator(sortFields) {
  this.compare = function(a, b) {
    for (let index = 0; index <sortFields.length; index++) {
      let sortField = sortFields[index];
      let coefficient = sortField['isAscending'] ? 1 : -1;
      let fieldName = sortField['fieldName'];
      let result = simpleCompare(get(a, fieldName), get(b, fieldName));

      if (result !== 0) {
        return result * coefficient;
      }
    }

    return 0;
  };
}
function simpleCompare(a,b) {
  let comparison = a > b;
  let equality = a === b;

  return equality ? 0 : comparison ? 1 : -1;
}

function createSortField(fieldName) {
  let isAscending = true;
  let tokens = fieldName.split(':');
  if (tokens.length>0) {
    isAscending = tokens[1] !== 'desc';
  }

  return {fieldName: tokens[0], isAscending: isAscending};
}

export default Component.extend({
  layout,
  tagName: '',

  init() {
    this._super(...arguments);

    if (isEmpty(this.get('sortFields'))) {
      this.set('sortFields', A());
    }
  },

  sortedData:computed('data', 'sortFields.[]', 'sorter', function() {
    if (isEmpty(this.get('data'))) {
      return [];
    }

    let sorter = this.get('sorter') || internalSorter;

    return sorter(this.get('data').slice(), this.get('internalSortFields'));
  }),

  internalSortFields: computed('sortFields.[]', function () {
    let result = A();

    if (isEmpty(this.get('sortFields'))) {
      return result;
    }

    this.get('sortFields').forEach(function (sortField) {
      result.pushObject(createSortField(sortField));
    });

    return result;
  }),

  actions: {
    onsortfieldupdated: function (fieldName, isAscending) {
      let filteredArray = this.get('sortFields').filter(function (item) {
        return item.indexOf(fieldName) !== 0;
      });

      if (!isEmpty(isAscending)) {
        let postFix = isAscending ? "asc" : "desc";
        filteredArray.push(`${fieldName}:${postFix}`);
      }

      this.set('sortFields', filteredArray);
    }
  }
});
