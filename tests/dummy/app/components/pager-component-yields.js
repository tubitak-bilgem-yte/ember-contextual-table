import Component from '@ember/component';

const DATA = [
  {option: 'next', type: 'boolean', description: 'A flag to indicate that rendering is to be placed for next page requesting ' +
    'component. An <code>if</code> check that controls whether or not rendering for <code>next</code> or <code>previous</code> ' +
    'requesting components is being performed is typically expected for usages in block form.'},
  {option: 'previous', type: 'boolean', description: 'A flag to indicate that rendering is to be placed for previous page requesting ' +
    'component. An <code>if</code> check that controls whether or not rendering for <code>next</code> or <code>previous</code> ' +
    'requesting components is being performed is typically expected for usages in block form.'}
];

export default Component.extend({
  data: DATA
});
