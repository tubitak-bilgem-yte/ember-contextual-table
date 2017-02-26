import Ember from 'ember';
const {computed, isEmpty, get} = Ember;
import layout from '../templates/data-sorter';

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

  return {name: tokens[0], isAscending: isAscending};
}

export default Ember.Component.extend({
  layout,
  tagName: '',

  init() {
    this._super(...arguments);

    if (isEmpty(this.get('sortFields'))) {
      this.set('sortFields', Ember.A());
    }
  },

  sortedData:computed('data', 'sortFields.[]', 'comparator', function() {
    if (isEmpty(this.get('data'))) {
      return [];
    }

    let comparator = this.get('comparator') || this.get('internalComparator').bind(this);

    return this.get('data').slice().sort(comparator);
  }),

  internalSortFields: computed('sortFields.[]', function () {
    let result = Ember.A();

    if (isEmpty(this.get('sortFields'))) {
      return result;
    }

    this.get('sortFields').forEach(function (sortField) {
      result.pushObject(createSortField(sortField));
    });

    return result;
  }),

  internalComparator: function(a, b) {
    let sortFields = this.get('internalSortFields');

    if (isEmpty(sortFields)) {
      return 0;
    }

    for (let index = 0; index <sortFields.length; index++) {
      let sortField = sortFields[index];
      let coefficient = sortField['isAscending'] ? 1 : -1;
      let fieldName = sortField['name'];
      let result = simpleCompare(get(a, fieldName), get(b, fieldName));

      if (result !== 0) {
        return result * coefficient;
      }
    }

    return 0;
  },

  actions: {
    onsortfieldupdated: function (fieldName, isAscending) {
      let filteredArray = this.get('sortFields').filter(function (item) {
        return item.indexOf(fieldName) !== 0;
      });

      let postFix = isAscending ? "asc" : "desc";
      filteredArray.push(`${fieldName}:${postFix}`);

      this.set('sortFields', filteredArray);
    }
  }
});
