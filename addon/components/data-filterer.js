import Ember from 'ember';
import layout from '../templates/data-filterer';
import {diacriticsInsensitiveMatcher as defaultMatcher} from '../util/diactricts';
const {computed, isEmpty, get} = Ember;

function createFieldFilter(fieldName, filter) {
  return {fieldName: fieldName, filter: filter};
}

function internalFilterer(data, filterFields) {
  if (isEmpty(filterFields)) {
    return data;
  }

  return data.filter(function (item) {
    return itemFilterer(item, filterFields);
  });
}

function itemFilterer(item, filterFields) {
  let satisfiedFilters = filterFields.filter((filterField)=>{
    let fieldName = get(filterField, 'fieldName');
    let filter = get(filterField, 'filter');

    return defaultMatcher(get(item, fieldName), filter);
  });

  return satisfiedFilters.length === filterFields.length;
}

export default Ember.Component.extend({
  layout,
  tagName:'',

  init() {
    this._super(...arguments);

    if (isEmpty(this.get('fieldFilters'))) {
      this.set('fieldFilters', Ember.A());
    }
  },

  filteredData:computed('data', 'filterer', 'fieldFilters.[]', function() {
    if (isEmpty(this.get('data'))) {
      return [];
    }

    let filterer = this.get('filterer') || internalFilterer;

    return filterer(this.get('data').slice(), this.get('fieldFilters'));
  }),

  actions: {
    onfilterfieldupdated: function (fieldName, filter) {
      let remainingFilters = this.get('fieldFilters').filter(function (item) {
        return get(item, 'fieldName') !== fieldName;
      });

      if (!isEmpty(filter)) {
        remainingFilters.push(createFieldFilter(fieldName, filter));
      }

      this.set('fieldFilters', remainingFilters);
    }
  }
});
