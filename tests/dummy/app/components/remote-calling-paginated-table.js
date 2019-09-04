// BEGIN-SNIPPET remote-calling-paginated-table
import $ from 'jquery';

import { A } from '@ember/array';
import { gt } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  currentPage:1,
  pageSize:5,
  nextDisabled:gt('currentPage', 5),
  tableClassNames:'table table-striped table-bordered table-hover table-responsive table-condensed',
  data: A(),

  didInsertElement() {
    this.fetchData();
  },

  fetchData() {
    let url = `https://api.github.com/repos/emberjs/ember.js/events?page=${this.get('currentPage')}&per_page=${this.get('pageSize')}`;

    $.getJSON(url, (json) => {
      this.set('data', json);
    });
  },

  actions: {
    nextPageRequested() {
      this.incrementProperty('currentPage');
      this.fetchData();
    },

    prevPageRequested() {
      this.decrementProperty('currentPage');
      this.fetchData();
    },

    selectionChanged:function(selectedRows){
      this.set('selectedRows', selectedRows);
    }
  }
});
// END-SNIPPET
