// BEGIN-SNIPPET team-filter-component
import Component from '@ember/component';

export default Component.extend({
  tagName:'',

  actions: {
    teamSelectionChanged: function (selectedTeams) {
      this.set('selectedTeams', selectedTeams);
      this.get('filterinformationupdated')('team', selectedTeams);
    }
  }
});
// END-SNIPPET
