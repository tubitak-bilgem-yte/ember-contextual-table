import { alias } from '@ember/object/computed';
import { computed, observer } from '@ember/object';
import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/data-paginator';

export default Component.extend({
  layout,
  firstPageNumber: 1,
  currentPage:1,
  pageSize:10,
  classNames:['contextual-data-paginator'],

  lastPageNumber: computed('data.[]', 'pageSize', function(){
    return Math.ceil((this.get('data.length') || 0) / this.get('pageSize') );
  }),

  pagesTotal: reads('lastPageNumber'),

  hasNext: computed('paginatedData.[]', 'pageSize', function(){
    return this.get('paginatedData').length === this.get('pageSize');
  }),

  hasPrevious: computed('currentPage', 'firstPageNumber', function(){
    return this.get('currentPage') > this.get('firstPageNumber');
  }),

  offset:computed('pageSize','currentPage', function(){
    let pageSize = this.get('pageSize');
    let currentPage = this.get('currentPage')-1;
    return currentPage * pageSize;
  }),

  limit:alias('pageSize'),

  paginatedDataObserver: observer('paginatedData.[]', function () {
    let paginatedData = this.get('paginatedData');
    if (!paginatedData.length) {
      if(this.get('currentPage') > 1){
        this.decrementProperty('currentPage');
      }
    }
  }),

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
    first: function(){
      this.set('currentPage', this.get('firstPageNumber'));
      this.fireDataRequested();
    },
    last: function(){
      this.set('currentPage', this.get('lastPageNumber'));
      this.fireDataRequested();
    },
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
