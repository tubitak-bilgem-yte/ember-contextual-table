// BEGIN-SNIPPET advanced-filtered-table
import Component from '@ember/component';

import { isEmpty } from '@ember/utils';
import { get } from '@ember/object';
import data from "../data";

function nameFilterer(item, filterField) {
  return get(item, 'name').toLowerCase().indexOf(get(filterField, 'filter').toLowerCase()) >= 0;
}

function teamFilterer(item, filterField) {
  let selectedTeams = get(filterField, 'filter');

  if (selectedTeams.length === 0) {
    return true;
  }

  for (const selectedTeam of selectedTeams) {
    if (get(item, 'team') === get(selectedTeam, 'shortName')) {

      return true;
    }
  }

  return false;
}

export default Component.extend({
  tableClassNames:'table table-striped table-bordered table-hover yte-table-responsive table-condensed',
  teams: data.teams,

  customFilterer(data, filterFields) {
    if (isEmpty(filterFields)) {
      return data;
    }

    return data.filter((item)=>{
      for (const filterField of filterFields) {
        if (get(filterField, 'fieldName') === 'name') {
          if (nameFilterer(item, filterField) === false) {
            return false;
          }
        } else if (get(filterField, 'fieldName') === 'team') {
          if (teamFilterer(item, filterField) === false) {
            return false;
          }
        }
      }

      return true;
    });
  },

  actions:{
    selectionChanged: function(selectedRows){
      this.set('selectedRows', selectedRows);
    }
  }
});
// END-SNIPPET
