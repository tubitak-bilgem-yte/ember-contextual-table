import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/dt-sortable-column-base';

export default Component.extend({
  layout,
  upArrowVisible: computed('isAscending', function () {
    return this.get('isAscending') === false;
  }),
  downArrowVisible: computed('isAscending', function () {
    return this.get('isAscending') === true;
  }),

  fireSortInformationUpdatedEvent(isAscending) {
    let actionHandler = this.get('sortinformationupdated') || function(){};
    actionHandler(this.get('propertyName'), isAscending);
  },

  actions: {
    onsortinfoupdate: function (isAscending) {
      this.fireSortInformationUpdatedEvent(isAscending);
    },

    onclick: function () {
      if (this.get('isAscending') === true) {
        this.set('isAscending', false);
      } else if (this.get('isAscending') === undefined) {
        this.set('isAscending', true);
      } else {
        this.set('isAscending', undefined);
      }

      this.fireSortInformationUpdatedEvent(this.get('isAscending'));
    }
  }
});
