import Component from '@ember/component';
import layout from '../templates/dt-selection-column-footer';

export default Component.extend({
  layout,
  tagName:'td',
  classNames:['contextual-selection-footer-cell'],

  actions:{
    change:function(checked){
      let actionName=checked ? 'selected' : 'deselected';
      let action = this.get(actionName) || function(){};
      action();
    }
  }
});
