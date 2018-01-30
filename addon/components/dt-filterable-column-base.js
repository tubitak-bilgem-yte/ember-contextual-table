import Component from '@ember/component';
import { observer } from '@ember/object';
import layout from '../templates/dt-filterable-column-base';

export default Component.extend({
  layout,

  filterValueChanged:observer('filterValue', function (){
    let actionHandler = this.get('filterinformationupdated') || function(){};
    actionHandler(this.get('propertyName'), this.get('filterValue'));
  }),

  actions: {
    onfilterupdate: function (filterValue) {
      this.set('filterValue', filterValue);
    }
  }
});
