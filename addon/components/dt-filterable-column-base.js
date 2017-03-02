import Ember from 'ember';
import layout from '../templates/dt-filterable-column-base';
const {observer} = Ember;

export default Ember.Component.extend({
  layout,

  filterValueChanged:observer('filterValue', function (){
    let actionHandler = this.get('filterinformationupdated') || Ember.K;
    actionHandler(this.get('propertyName'), this.get('filterValue'));
  }),

  actions: {
    onfilterupdate: function (filterValue) {
      this.set('filterValue', filterValue);
    }
  }
});
