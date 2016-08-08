import Ember from 'ember';
import layout from '../templates/dt-selection-column-footer';

export default Ember.Component.extend({
  layout,
  tagName:'td',
  classNames:['contextual-selection-footer-cell'],

  actions:{
    change:function(checked){
      let actionName=checked ? 'selected' : 'deselected';
      let action = this.get(actionName) || Ember.K;
      action();
    }
  }
});
