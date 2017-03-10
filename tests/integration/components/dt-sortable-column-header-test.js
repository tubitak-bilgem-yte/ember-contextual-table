import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dt-sortable-column-header', 'Integration | Component | dt sortable column header', {
  integration: true,

  beforeEach() {
    this.set('eventFireCount', 0);
    this.set('name', 'Sortable Header');
    this.set('propertyName', 'Property');
  }
});

test('it renders up and down arrows in simple form', function(assert) {
  assert.expect(16);

  this.on('myAction', (fieldName, isAscending)=> {
    this.set('eventFireCount', this.get('eventFireCount') + 1);
    assert.equal(this.get('propertyName'), fieldName, 'Field name in event firing does not match the property name passed in');

    if (this.get('eventFireCount')%3===0) {
      assert.equal(undefined, isAscending, 'Is ascending must be undefined initially and every third click on the component');
    } else if (this.get('eventFireCount')%3===1) {
      assert.equal(true, isAscending, 'Is ascending must be true after first click and every following third click on the component');
    } else {
      assert.equal(false, isAscending, 'Is ascending must be false after second click and every following third click on the component');
    }

  });

  this.render(hbs`{{dt-sortable-column-header name=name propertyName=propertyName sortinformationupdated=(action 'myAction')}}`);
  assertText(this.$(), assert, 'SortableHeader●', 'None of up and down arrows are visible initially');
  this.$('span').click();
  assertText(this.$(), assert, 'SortableHeader▼', 'Only down arrow is visible when isAscending is true');
  this.$('span').click();
  assertText(this.$(), assert, 'SortableHeader▲', 'Only up arrow is visible when isAscending is false');
  this.$('span').click();
  assertText(this.$(), assert, 'SortableHeader●', 'None of up and down arrows are visible at 3rd click');
  this.$('span').click();
  assertText(this.$(), assert, 'SortableHeader▼', 'Only down arrow is visible when isAscending is true after 4th click');
  this.$('span').click();
  assertText(this.$(), assert, 'SortableHeader▲', 'Only down arrow is visible when isAscending is false after 5th click');
});

test('it renders in block form and event is fired with outsider buttons', function(assert) {
  assert.expect(10);
  this.set('isAscending', undefined);
  this.set('buttonPressCount', 0);


  this.on('myAction', function(fieldName, isAscending) {
    this.set('buttonPressCount', this.get('buttonPressCount') + 1);
    let buttonPressCount = this.get('buttonPressCount');
    this.set('isAscending', isAscending);
    assert.equal(fieldName, 'theNameOfProperty', 'Property name should have been "theNameOfProperty"');

    if (buttonPressCount === 1) {
      assert.equal(isAscending, true, 'First click should have resulted in ascending order');
    } else if (buttonPressCount === 2) {
      assert.equal(isAscending, undefined, 'Second click should have resulted in undefined order');
    } else if (buttonPressCount === 3) {
      assert.equal(isAscending, false, 'Third click should have resulted in descending order');
    }
  });

  this.render(hbs`
    {{#dt-sortable-column-header name=name propertyName='theNameOfProperty' sortinformationupdated=(action 'myAction') as |sc|}}
      {{sc.header}}-{{isAscending}}-{{sc.footer}}
      <button id="button1" onclick={{action sc.onsortinfoupdate true}}></button>
      <button id="button2" onclick={{action sc.onsortinfoupdate undefined}}></button>
      <button id="button3" onclick={{action sc.onsortinfoupdate false}}></button>
    {{/dt-sortable-column-header}}
  `);

  // Does not fire event that was fired by default
  this.$('th').click();
  assertText(this.$(), assert, 'true--', 'Following should have hold: Yielded header-true, isAscending undefined, yielded footer-undefined');

  // Button clicks fire event
  this.$('#button1').click();
  assertText(this.$(), assert, 'true-true-', 'Following should have hold: Yielded header-true, isAscending true, yielded footer-undefined');
  this.$('#button2').click();
  assertText(this.$(), assert, 'true--', 'Following should have hold: Yielded header-true, isAscending undefined, yielded footer-undefined');
  this.$('#button3').click();
  assertText(this.$(), assert, 'true-false-', 'Following should have hold: Yielded header-true, isAscending false, yielded footer-undefined');
});

function assertText($, assert, expected, message) {
  assert.equal($.text().trim().replace(/\s/g, ''), expected, message);
}
