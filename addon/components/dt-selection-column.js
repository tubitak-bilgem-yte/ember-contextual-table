import Ember from 'ember';
import layout from '../templates/dt-selection-column';

export default Ember.Component.extend({
  layout,
  tagName:'td',
  classNames:['contextual-selection-cell'],

  actions:{
    change:function(checked){
      let actionName=checked ? 'rowSelected' : 'rowDeselected';
      let action = this.get(actionName) || function(){};
      action();
    }
  }
});
