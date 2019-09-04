import Component from '@ember/component';

const DATA = [
  {option: 'filterinformationupdated', type: 'closure-action', description: 'Closure action to be fired whenever filter ' +
    'value changes. The handling action definitions should expect the following parameters in order. <ul><li><b>fieldName</b> : ' +
    'string type value that is the name of the field (property) the filtering is being applied</li><li><b>filterValue</b> ' +
    'object type field that is the value to be applied as filter to the specified field</li></ul> This property is typically expected ' +
    'to be assigned <code>onfilterfieldupdated</code> yielded from <code>data-filterer</code> when used together.'},
  {option: 'placeHolder', type: 'string', description: 'The value to to display as prompt text for the input component ' +
    'that is displayed when <code>filterableColumn</code> is used in basic form as opposed to block form.'},
  {option: 'propertyName', type: 'string', description: 'The field name that determines the name of the property filtering ' +
    'is to be applied for.'}
];

export default Component.extend({
  data: DATA
});
