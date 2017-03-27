import Ember from 'ember';
import layout from '../templates/data-table';

export default Ember.Component.extend({
  layout,
  tagName:'table',

  showHeader:true,
  showFooter:false,

  singleSelection:Ember.computed.equal('selectionMode','single'),

  notSelectedRows:Ember.computed.setDiff('data','selectedRows'),
  isAllSelected:Ember.computed.empty('notSelectedRows'),

  selectionChanged:function(){},
  classNames:['contextual-data-table'],

  selectedRows:Ember.computed('data.[]',{
    get(){
      return Ember.A();
    },
    set(key, value){
      let arr = Ember.A();
      if(Ember.isArray(value)){
        arr.pushObjects(value);
      }
      return arr;
    }
  }),

  actions:{
    selected:function(row){
      if(this.get('selectionMode')==='single'){
        this.get('selectedRows').clear();
      }
      this.get('selectedRows').pushObject(row);
      this.get('selectionChanged')(this.get('selectedRows'));
    },
    deselected:function(row){
      this.get('selectedRows').removeObject(row);
      this.get('selectionChanged')(this.get('selectedRows'));
    },
    selectAll:function(){
      if(this.get('selectionMode')==='single'){
        return false;
      }
      this.get('selectedRows').clear();
      this.get('selectedRows').pushObjects(this.get('data'));
      this.get('selectionChanged')(this.get('selectedRows'));
    },
    deselectAll:function(){
      this.get('selectedRows').clear();
      this.get('selectionChanged')(this.get('selectedRows'));
    }
  }
});
