import Ember from 'ember';
import layout from '../templates/pager-component';

export default Ember.Component.extend({
  layout,
  classNames:['contextual-pager-component'],

  previousDisabled: Ember.computed('currentPage',function(){
    return (this.get('currentPage') <= 1) ;
  }),

  previousButtonClass: Ember.computed('previousDisabled',function(){
    return (this.get('previousDisabled') ? 'disabled' : '') ;
  }),

  nextButtonClass: Ember.computed('nextDisabled',function(){
    return (this.get('nextDisabled') ? 'disabled' : '') ;
  }),

  previousLabel: '<<',
  nextLabel: '>>',

  actions:{
    previous:function(){
      if (this.get('previousDisabled')) {
        return;
      }

      (this.get('previous')|| function(){})();
    },
    next:function(){
      if (this.get('nextDisabled')) {
        return;
      }

      (this.get('next')|| function(){})();
    }
  }
});
