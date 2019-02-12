import { A, isArray } from '@ember/array';
import { computed, set } from '@ember/object';
import { equal, setDiff, empty, map } from '@ember/object/computed';
import Component from '@ember/component';
import { guidFor } from '@ember/object/internals';
import { isBlank } from '@ember/utils';
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

  rowIdPrefixWithTableElementId: computed('elementId', 'rowIdPrefix', function(){
    let elementId = this.get('elementId');
    if(isBlank(elementId)){
      elementId = guidFor(this);
    }
    let rowIdPrefix = this.get('rowIdPrefix');
    if(isBlank(rowIdPrefix)){
      rowIdPrefix = '-table-row-id';
    }
    return elementId + rowIdPrefix;
  }),

  wrappedData:map('data', function (item) {
    return {row: item, isSelected:false}
  }),


  selectedRows:computed('wrappedData.@each.isSelected',{
    get(){
      return this.get('wrappedData').filter((item)=>item.isSelected).map((item)=>item.row);
    },
    set(key, value){
      let arr = A();
      if(isArray(value)){
        arr.pushObjects(value);
      }

      this.get('wrappedData').forEach((item)=>set(item, 'isSelected', false));

      arr.forEach((item)=>{
        let found = this.get('wrappedData').find((element)=>element.row===item);

        if (found) {
          set(found, 'isSelected', true);
        }
      });

      return arr;
    }
  }),

  selectedFunction(row){
    if(this.get('selectionMode')==='single'){
      this.get('wrappedData').forEach((item)=>set(item, 'isSelected', false));
    }

    set(row, 'isSelected', true);
    this.get('selectionChanged')(this.get('selectedRows'));
  },

  deselectedFunction(row){
    set(row, 'isSelected', false);
    this.get('selectionChanged')(this.get('selectedRows'));
  },

  actions:{
    selected:function(row){
      this.selectedFunction(row);
    },
    deselected:function(row){
      this.deselectedFunction(row);
    },
    selectAll:function(){
      if(this.get('selectionMode')==='single'){
        return;
      }
      this.get('wrappedData').forEach((item)=>set(item, 'isSelected', true));
      this.get('selectionChanged')(this.get('selectedRows'));
    },
    deselectAll:function(){
      this.get('wrappedData').forEach((item)=>set(item, 'isSelected', false));
      this.get('selectionChanged')(this.get('selectedRows'));
    },
    handleRowDoubleClick(row){
      if(this.get('onRowDoubleClick')){
        this.get('onRowDoubleClick')(row.row);
      }
      else{
        if(row.isSelected){
          this.deselectedFunction(row);
        }
        else{
          this.selectedFunction(row);
        }
      }
    },
    handleRowSingleClick(row){
      if(this.get('onRowSingleClick')){
        this.get('onRowSingleClick')(row.row);
      }
    },
  }
});
