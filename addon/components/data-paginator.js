import Ember from 'ember';
import layout from '../templates/data-paginator';

export default Ember.Component.extend({
  layout,
  currentPage:1,
  pageSize:10,
  classNames:['contextual-data-paginator'],

  hasNext:Ember.computed('paginatedData.[]', 'pageSize', function(){
     return this.get('paginatedData').length === this.get('pageSize');
  }),

  offset:Ember.computed('pageSize','currentPage', function(){
    let pageSize = this.get('pageSize');
    let currentPage = this.get('currentPage')-1;
    return currentPage * pageSize;
  }),

  limit:Ember.computed.alias('pageSize'),

  paginatedData:Ember.computed('data.[]', 'pageSize', 'currentPage', function(){
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
    (this.get('dataRequested')||Ember.K)(offset, limit);
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
