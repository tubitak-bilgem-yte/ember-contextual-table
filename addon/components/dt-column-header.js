import Ember from 'ember';
import layout from '../templates/dt-column-header';

export default Ember.Component.extend({
  layout,
  tagName:'th',
  classNames:['contextual-header-cell']
});
