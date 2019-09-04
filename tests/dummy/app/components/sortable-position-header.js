// BEGIN-SNIPPET sortable-position-header
import { not, equal } from '@ember/object/computed';

import Component from '@ember/component';

const SORTING_MODES = ['ascending', 'descending'];

export default Component.extend({
  sortingEnabled: false,
  sortingDisabled: not('sortingEnabled'),
  sortingModes: SORTING_MODES,
  sortingMode: 'ascending',
  isAscending: equal('sortingMode', 'ascending'),

  fireSortingInformationUpdated() {
    let sortingModeToFire = this.get('sortingEnabled') ? this.get('isAscending') : undefined;
    this.get('onsortinfoupdate')(sortingModeToFire);
  },

  actions: {
    toggleSorting() {
      this.toggleProperty('sortingEnabled');
      this.fireSortingInformationUpdated();
    },

    changeSortingMode(sortingMode) {
      this.set('sortingMode', sortingMode);
      this.fireSortingInformationUpdated();
    }
  }
});
// END-SNIPPET
