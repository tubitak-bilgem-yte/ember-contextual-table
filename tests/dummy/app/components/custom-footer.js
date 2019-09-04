// BEGIN-SNIPPET custom-footer
import Component from '@ember/component';

export default Component.extend({
  tagName:'tfoot',

  actions: {
    buttonClicked: function(value) {
      let actionToCall = value === true ? this.get('selected') : this.get('deselected');

      actionToCall = actionToCall || function () {};

      actionToCall();
    }
  }
});
// END-SNIPPET
