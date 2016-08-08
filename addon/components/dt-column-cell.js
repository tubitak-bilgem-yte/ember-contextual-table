import Ember from 'ember';
import layout from '../templates/dt-column-cell';

export default Ember.Component.extend({
  layout,
  tagName:'td',
  classNames:['contextual-cell']

});
