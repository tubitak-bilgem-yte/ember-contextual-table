import Service, { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';
const {alias} = computed;

let menu = [{target: 'overview', text: 'Overview'},
  {target: 'installation', text: 'Installation'},
  {target: 'basic-usage', text: 'Basic Usage'},
  {target: 'cell-customization', text:'Cell Customization'},
  {target: 'header-footer-customization', text: 'Header & Footer Customization'},
  {target: 'row-detail-displaying', text: 'Row Detail Displaying'},
  {target: 'pagination', text: 'Pagination'},
  {target: 'filtering', text:'Filtering'},
  {target: 'sorting', text: 'Sorting'},
  {target: 'filter-and-sorting', text:'Filter and Sorting'},
  {target: 'row-click', text: 'Row Click Handling'},
  {target: 'col-resizable', text: 'Resizable Columns'},
  {target: 'api-reference', text: "API-Reference"}];

export default Service.extend({
  menu: menu,

  routing: service("-routing"),

  activeRoute: alias('routing.currentRouteName'),

  activeIndex: computed('activeRoute', function () {
    return this.get('menu').findIndex((item)=>{
     return get(item, 'target') === this.get('activeRoute');
    });
  }),

  nextHidden: computed('activeIndex', function () {
    return this.get('activeIndex') === this.get('menu').length - 1;
  }),

  prevHidden: computed('activeIndex', function () {
    return this.get('activeIndex') === 0;
  }),

  nextText: computed('nextHidden', function () {
    return this.get('nextHidden') ? '' : get(this.get('menu')[this.get('activeIndex')+1], 'text');
  }),

  nextTarget: computed('nextHidden', function () {
    return this.get('nextHidden') ? '' : get(this.get('menu')[this.get('activeIndex')+1], 'target');
  }),

  prevText: computed('prevHidden', function () {
    return this.get('prevHidden') ? '' : get(this.get('menu')[this.get('activeIndex')-1], 'text');
  }),

  prevTarget: computed('prevHidden', function () {
    return this.get('prevHidden') ? '' : get(this.get('menu')[this.get('activeIndex')-1], 'target');
  }),

  getFirstRoute() {
    return get(this.get('menu')[0], 'target');
  }
});
