import { A, isArray } from '@ember/array';
import { computed } from '@ember/object';
import { equal, setDiff, empty } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/data-table';

export default Component.extend({
  layout,
  tagName:'table',

  showHeader:true,
  showFooter:false,

  singleSelection:equal('selectionMode','single'),

  notSelectedRows:setDiff('data','selectedRows'),
  isAllSelected:empty('notSelectedRows'),

  selectionChanged:function(){},
  classNames:['contextual-data-table'],

  rowIdPrefix:'table-row-id',

  selectedRows:computed('data.[]',{
    get(){
      return A();
    },
    set(key, value){
      let arr = A();
      if(isArray(value)){
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
