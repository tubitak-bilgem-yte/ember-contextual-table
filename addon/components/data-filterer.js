import Ember from 'ember';
import layout from '../templates/data-filterer';
import {diacriticsInsensitiveMatcher as defaultMatcher} from '../util/diactricts';
const {computed, isEmpty, get} = Ember;

function createFilterField(fieldName, filter) {
  return {fieldName: fieldName, filter: filter};
}

export default Ember.Component.extend({
  layout,
  tagName:'',

  init() {
    this._super(...arguments);

    if (isEmpty(this.get('filterFields'))) {
      this.set('filterFields', Ember.A());
    }
  },

  filteredData:computed('data', 'matcher', 'filterFields.[]', function() {
    if (isEmpty(this.get('data'))) {
      return [];
    }

    let matcher = this.get('matcher') || this.get('internalMatcher').bind(this);

    return this.get('data').filter(matcher);
  }),

  internalMatcher: function (item) {
    let filterFields = this.get('filterFields');

    if (isEmpty(filterFields)) {
      return true;
    }

    let satisfiedFilters = filterFields.filter((filterField)=>{
      let fieldName = get(filterField, 'fieldName');
      let filter = get(filterField, 'filter');

      return defaultMatcher(get(item, fieldName), filter);
    });

    return satisfiedFilters.length === filterFields.length;
  },

  actions: {
    onfilterfieldupdated: function (fieldName, filterText) {
      let remainingFilters = this.get('fieldFilters').filter(function (item) {
        return get(item, 'fieldName') !== fieldName;
      });

      if (!isEmpty(filterText)) {
        remainingFilters.pushObject(createFilterField(fieldName, filterText));
      }

      this.set('fieldFilters', remainingFilters);
    }
  }
});
