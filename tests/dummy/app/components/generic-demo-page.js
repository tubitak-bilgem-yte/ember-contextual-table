import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  filesToDisplay:computed('files', function(){
    if (this.get('files')) {
      return this.get('files').split(',');
    }

    return [];
  }),

  collapsed:true,

  actions:{
    toggleCollapse(){
      this.set('collapsed', !this.get('collapsed'));
    }
  }
});
