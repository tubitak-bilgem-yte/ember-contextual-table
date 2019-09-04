import Component from '@ember/component';

const DATA = [
  {option: 'name', type: 'string', description: 'The value to to display in the header/footer of the component that is ' +
    'displayed when <code>sortableColumn</code> is used in basic form as opposed to block form.'},
  {option: 'propertyName', type: 'string', description: 'The field name that determines the name of the property sorting ' +
    'is to be applied for.'},
  {option: 'sortinformationupdated', type: 'closure-action', description: 'Closure action to be fired whenever sorting ' +
    'information for a specified property changes. The handling action definitions should expect the following parameters ' +
    'in order. <ul><li><b>fieldName</b> : string type value, that is the name of the field (property) the sorting is being applied</li>' +
    '<li><b>isAscending</b> : a <code>boolean</code> value to determine order of sorting. <code>true</code> should be treated ' +
    'as ascending; false should be treated as descending; and undefined should be treated as no sorting.</li></ul> This ' +
    'property is typically expected to be assigned <code>onsortfieldupdated</code> yielded from <code>data-sorter</code> ' +
    'when used together.'}
];

export default Component.extend({
  data: DATA
});
