// BEGIN-SNIPPET custom-header
import Component from '@ember/component';

export default Component.extend({
  tagName:'thead',

  actions: {
    checkBoxClicked: function(value) {
      let actionToCall = value === true ? this.get('selected') : this.get('deselected');

      actionToCall = actionToCall || function () {};

      actionToCall();
    }
  }
});
// END-SNIPPET
