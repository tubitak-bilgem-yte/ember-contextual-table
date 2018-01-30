import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/data-paginator';

export default Component.extend({
  layout,
  currentPage:1,
  pageSize:10,
  classNames:['contextual-data-paginator'],

  hasNext:computed('paginatedData.[]', 'pageSize', function(){
     return this.get('paginatedData').length === this.get('pageSize');
  }),

  offset:computed('pageSize','currentPage', function(){
    let pageSize = this.get('pageSize');
    let currentPage = this.get('currentPage')-1;
    return currentPage * pageSize;
  }),

  limit:alias('pageSize'),

  paginatedData:computed('data.[]', 'pageSize', 'currentPage', function(){
    let data = this.get('data'); //TODO : Ember.assert 'data' is not null/undefined
    let pageSize = this.get('pageSize');
    let currentPage = this.get('currentPage')-1;

    let start= currentPage * pageSize;
    let end = (currentPage +1) * pageSize;
    return data.slice(start, end);
  }),

  fireDataRequested:function(){
    let offset = this.get('offset');
    let limit = this.get('limit');
    let dataRequested = this.get('dataRequested');
    if(dataRequested){
        dataRequested(offset, limit);
    }
  },

  actions:{
    previous:function(){
      this.decrementProperty('currentPage');
      this.fireDataRequested();
    },
    next:function(){
      this.incrementProperty('currentPage');
      this.fireDataRequested();
    }
  }
});
