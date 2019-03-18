import Mixin from '@ember/object/mixin';
import { observer } from '@ember/object';
import layout from '../templates/dt-filterable-column';

export default Mixin.create({
  layout,

  filterValueChanged: observer('filterValue', function (){
    let actionHandler = this.get('filterinformationupdated') || function(){};
    actionHandler(this.get('propertyName'), this.get('filterValue'));
  }),

  actions: {
    onfilterupdate: function (filterValue) {
      this.set('filterValue', filterValue);
    }
  }
});
