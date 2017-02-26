import Ember from 'ember';
import layout from '../templates/dt-sortable-column-header';
const {computed} = Ember;

export default Ember.Component.extend({
  layout,
  tagName:'th',
  classNames:['contextual-sortable-header-cell'],
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

    this.get('actions.onclick').bind(this)(this.get('propertyName'), this.get('isAscending'));
  },

  actions: {
    onclick: function (fieldName, isAscending) {
      let actionHandler = this.get('sortinformationupdated') || Ember.K;
      console.log(`${fieldName}-${isAscending}`);
      actionHandler(fieldName, isAscending);
    }
  }
});
