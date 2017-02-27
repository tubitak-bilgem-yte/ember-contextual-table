import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dt-sortable-column-footer', 'Integration | Component | dt sortable column footer', {
  integration: true,

  beforeEach() {
    this.set('eventFireCount', 0);
    this.set('name', 'Sortable Footer');
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

  this.render(hbs`{{dt-sortable-column-footer name=name propertyName=propertyName sortinformationupdated=(action 'myAction')}}`);
  assertText(this.$(), assert, 'SortableFooter▴▾', 'Both up and down arrows are visible initially');
  this.$('td').click();
  assertText(this.$(), assert, 'SortableFooter▾', 'Only down arrow is visible when isAscending is true');
  this.$('td').click();
  assertText(this.$(), assert, 'SortableFooter▴', 'Only up arrow is visible when isAscending is false');
  this.$('td').click();
  assertText(this.$(), assert, 'SortableFooter▴▾', 'Both up and down arrows are visible at 3rd click');
  this.$('td').click();
  assertText(this.$(), assert, 'SortableFooter▾', 'Only down arrow is visible when isAscending is true after 4th click');
  this.$('td').click();
  assertText(this.$(), assert, 'SortableFooter▴', 'Only down arrow is visible when isAscending is false after 5th click');
});

test('it renders in block form and event is fired with outsider buttons', function(assert) {
  assert.expect(7);
  this.set('fieldName', 'foo');

  this.on('myAction', function(fieldName, isAscending) {
    this.set('fieldName', fieldName);

    if (fieldName === "firstProperty") {
      assert.equal(isAscending, true, 'First property should have been requested in ascending order');
    } else if (fieldName === "secondProperty") {
      assert.equal(isAscending, undefined, 'Second property should have been requested in undefined order');
    } else if (fieldName === "thirdProperty") {
      assert.equal(isAscending, false, 'Third property should have been requested in descending order');
    }
  });

  this.render(hbs`
    {{#dt-sortable-column-footer name=name propertyName=propertyName sortinformationupdated=(action 'myAction') as |sc|}}
      {{sc.header}}-{{fieldName}}-{{sc.footer}}
      <button id="button1" onclick={{action sc.onsortinfoupdate "firstProperty" true}}></button>
      <button id="button2" onclick={{action sc.onsortinfoupdate "secondProperty" undefined}}></button>
      <button id="button3" onclick={{action sc.onsortinfoupdate "thirdProperty" false}}></button>
    {{/dt-sortable-column-footer}}
  `);

  // Does not fire event that was fired by default
  this.$('td').click();
  assertText(this.$(), assert, '-foo-true', 'Following should have hold: Yielded header-undefined, field property-foo, yielded footer-true');

  // Button clicks fire event
  this.$('#button2').click();
  assertText(this.$(), assert, '-secondProperty-true', 'Following should have hold: Yielded header-undefined, field property-secondProperty, yielded footer-true');
  this.$('#button3').click();
  assertText(this.$(), assert, '-thirdProperty-true', 'Following should have hold: Yielded header-undefined, field property-thirdProperty, yielded footer-true');
  this.$('#button1').click();
  assertText(this.$(), assert, '-firstProperty-true', 'Following should have hold: Yielded header-undefined, field property-firstProperty, yielded footer-true');
});

function assertText($, assert, expected, message) {
  assert.equal($.text().trim().replace(/\s/g, ''), expected, message);
}
