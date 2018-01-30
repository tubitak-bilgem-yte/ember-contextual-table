import Component from '@ember/component';
import layout from '../templates/dt-column-header';

export default Component.extend({
  layout,
  tagName:'th',
  classNames:['contextual-header-cell']
});
