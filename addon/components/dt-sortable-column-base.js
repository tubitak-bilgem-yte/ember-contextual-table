import Ember from 'ember';
import layout from '../templates/dt-sortable-column-base';
const {computed} = Ember;

export default Ember.Component.extend({
  layout,
  upArrowVisible: computed('isAscending', function () {
    return this.get('isAscending') === false;
  }),
  downArrowVisible: computed('isAscending', function () {
    return this.get('isAscending') === true;
  }),

  click: function () {
    if (this.get('isAscending') === true) {
      this.set('isAscending', false);
    } else if (this.get('isAscending') === undefined) {
      this.set('isAscending', true);
    } else {
      this.set('isAscending', undefined);
    }

    // Prevent auto event firing in case of block form usage!
    if (this.$('#hasBlockIdentifier').length>0) {
      return;
    }
    this.fireSortInformationUpdatedEvent(this.get('propertyName'), this.get('isAscending'));
  },

  fireSortInformationUpdatedEvent(fieldName, isAscending) {
    let actionHandler = this.get('sortinformationupdated') || Ember.K;
    actionHandler(fieldName, isAscending);
  },

  actions: {
    onsortinfoupdate: function (fieldName, isAscending) {
      this.fireSortInformationUpdatedEvent(fieldName, isAscending);
    }
  }
});
