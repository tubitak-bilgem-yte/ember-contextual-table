import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName:'',

  linkClass: computed('isActive', function () {
    return this.get('isActive') ? 'active-link' : '';
  })
});
