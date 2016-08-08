import Ember from 'ember';
import layout from '../templates/dt-selection-column-header';

export default Ember.Component.extend({
  layout,
  tagName:'th',
  classNames:['contextual-selection-header-cell'],

  actions:{
    change:function(checked){
      let actionName=checked ? 'selected' : 'deselected';
      let action = this.get(actionName) || Ember.K;
      action();
    }
  }
});
