import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/pager-component';

export default Component.extend({
  layout,
  classNames:['contextual-pager-component'],

  previousDisabled: computed('currentPage',function(){
    return (this.get('currentPage') <= 1) ;
  }),

  previousButtonClass: computed('previousDisabled',function(){
    return (this.get('previousDisabled') ? 'disabled' : '') ;
  }),

  nextButtonClass: computed('nextDisabled',function(){
    return (this.get('nextDisabled') ? 'disabled' : '') ;
  }),

  previousLabel: '<<',
  nextLabel: '>>',

  actions:{
    previous:function(e){
      e.preventDefault();
      if (this.get('previousDisabled')) {
        return;
      }

      (this.get('previous')|| function(){})();
    },
    next:function(e){
      e.preventDefault();
      if (this.get('nextDisabled')) {
        return;
      }

      (this.get('next')|| function(){})();
    }
  }
});
