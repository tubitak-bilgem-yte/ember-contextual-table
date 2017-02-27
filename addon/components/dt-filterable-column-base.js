import Ember from 'ember';
import layout from '../templates/dt-filterable-column-base';
const {observer} = Ember;

export default Ember.Component.extend({
  layout,

  filterTextChanged:observer('filterText', function (){
    let actionHandler = this.get('onfilterupdated') || Ember.K;
    actionHandler(this.get('filterText'));
  }),

  actions: {
    onfilterupdate: function (filterText) {
      this.set('filterText', filterText);
    }
  }
});
