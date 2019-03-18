import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const COMPONENTS = [
  'dt-sortable-column-header',
  'dt-sortable-column-footer',
];

function assertText($, assert, expected, message) {
  assert.equal($.text().trim().replace(/\s/g, ''), expected, message);
}

module('Integration | Component | dt-sortable-column', function(hooks) {
  setupRenderingTest(hooks);

  COMPONENTS.forEach((component) => {
    module(component, function(hooks) {
      hooks.beforeEach(function() {
        this.set('comp', component);

        this.set('eventFireCount', 0);
        this.set('name', 'Sortable');
        this.set('propertyName', 'Property');
      });

      test('it renders up and down arrows in simple form', async function(assert) {
        assert.expect(16);

        this.set('myAction', (fieldName, isAscending)=> {
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

        await render(hbs`{{component comp name=name propertyName=propertyName sortinformationupdated=(action myAction)}}`);
        assertText(this.$(), assert, 'Sortable●', 'None of up and down arrows are visible initially');

        await click('span');
        assertText(this.$(), assert, 'Sortable▼', 'Only down arrow is visible when isAscending is true');

        await click('span');
        assertText(this.$(), assert, 'Sortable▲', 'Only up arrow is visible when isAscending is false');

        await click('span');
        assertText(this.$(), assert, 'Sortable●', 'None of up and down arrows are visible at 3rd click');

        await click('span');
        assertText(this.$(), assert, 'Sortable▼', 'Only down arrow is visible when isAscending is true after 4th click');

        await click('span');
        assertText(this.$(), assert, 'Sortable▲', 'Only down arrow is visible when isAscending is false after 5th click');
      });

      test('it renders in block form and event is fired with outsider buttons', async function(assert) {
        assert.expect(10);
        this.set('isAscending', undefined);
        this.set('buttonPressCount', 0);

        this.set('myAction', function(fieldName, isAscending) {
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

        await render(hbs`
          {{#component comp name=name propertyName='theNameOfProperty' sortinformationupdated=(action myAction) as |sc|}}
            {{isAscending}}
            <button id="button1" onclick={{action sc.onsortinfoupdate true}}></button>
            <button id="button2" onclick={{action sc.onsortinfoupdate undefined}}></button>
            <button id="button3" onclick={{action sc.onsortinfoupdate false}}></button>
          {{/component}}
        `);

        // Does not fire event that was fired by default
        await click(component.includes('header') ? 'th' : 'td');
        assertText(this.$(), assert, '', 'Following should have hold: Yielded header-undefined, isAscending undefined, yielded footer-true');

        // Button clicks fire event
        await click('#button1');
        assertText(this.$(), assert, 'true', 'Following should have hold: Yielded header-undefined, isAscending true, yielded footer-true');

        await click('#button2');
        assertText(this.$(), assert, '', 'Following should have hold: Yielded header-undefined, isAscending undefined, yielded footer-true');

        await click('#button3');
        assertText(this.$(), assert, 'false', 'Following should have hold: Yielded header-undefined, isAscending false, yielded footer-true');
      });

      test('it yields header and footer', async function(assert) {
        await render(hbs`
          {{#component comp as |sc|}}
            {{sc.header}}-{{sc.footer}}
          {{/component}}
        `);

        assert.dom(component.includes('header') ? 'th' : 'td').hasText(component.includes('header') ? 'true-' : '-true');
      });

      if (component.includes('header')) {
        test('it renders in block form with defaultHeader=true', async function(assert) {
          await render(hbs`
            {{#component comp name=name propertyName='theNameOfProperty' defaultHeader=true  as |sc|}}
              {{sc.header}}-{{isAscending}}-{{sc.footer}}
            {{/component}}
          `);

          // Does not fire event that was fired by default
          assertText(this.$(), assert, 'Sortable●', 'With defaultHeader=true parameter, header should be default header.');
        });
      }
    });
  });
});
