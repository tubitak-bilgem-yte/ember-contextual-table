import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const COMPONENTS = [
  'dt-filterable-column-header',
  'dt-filterable-column-footer',
];

module('Integration | Component | dt-filterable-column', function(hooks) {
  setupRenderingTest(hooks);

  COMPONENTS.forEach((component) => {
    module(component, function(hooks) {
      hooks.beforeEach(function() {
        this.set('comp', component);
      });

      test('it renders an input for filtering in simple form', async function(assert) {
        this.set('eventFireCount', 0);
        this.set('filterAction', (fieldName, filterValue) => {
          this.set('eventFireCount', this.get('eventFireCount') + 1);
          assert.step(filterValue);
        });
        await render(hbs`
          {{component comp filterinformationupdated=(action filterAction) filterValue=filterValue placeholder='Filter...'}}
        `);

        assert.equal(this.$('input').text().trim(), '', 'Filter text should have been initially empty');
        assert.equal(this.$('input').attr('placeholder'), 'Filter...', 'Placeholder should have been passed to the input');

        await fillIn('input', 'jack');

        this.set('filterValue', 'john');

        assert.equal(this.get('eventFireCount'), 2);
        assert.verifySteps(['jack', 'john']);
      });

      test('it yields corresponding action in block form', async function(assert) {
        this.set('eventFireCount', 0);
        this.set('filterAction', (fieldName, filterValue) => {
          this.set('eventFireCount', this.get('eventFireCount') + 1);
          assert.step(filterValue);
        });
        await render(hbs`
          {{#component comp filterinformationupdated=(action filterAction) as |fc|}}
            {{input key-up=(action fc.onfilterupdate)}}
          {{/component}}
        `);

        await fillIn('input', 'jack');
        await triggerKeyEvent('input', 'keyup', 'Enter');

        await fillIn('input', 'john');
        await triggerKeyEvent('input', 'keyup', 'Enter');

        assert.equal(this.get('eventFireCount'), 2);
        assert.verifySteps(['jack', 'john']);
      });

      if (component.includes('header')) {
        test('it yields header true', async function(assert) {
          await render(hbs`
            {{#component comp as |fc|}}
              {{fc.header}}-{{fc.footer}}
            {{/component}}
          `);

          assert.dom('th').hasText('true-', 'Yielded header should have been true and footer should have been undefined');
        });

        test('it yields header true but defaultHeader=true', async function(assert) {
          await render(hbs`
            {{#component comp defaultHeader=true as |fc|}}
              This is some text for header
            {{/component}}
          `);

          assert.dom('th').hasText('', 'With defaultHeader=true parameter, header should be default header.');
          assert.dom('th').exists({ count: 1 }, 'There should be one input');
        })
      }

      if (component.includes('footer')) {
        test('it yields footer true', async function(assert) {
          await render(hbs`
            {{#component comp as |fc|}}
              {{fc.header}}-{{fc.footer}}
            {{/component}}
          `);

          assert.dom('td').hasText('-true', 'Yielded header should have been undefined and footer should have been true');
        });
      }
    });
  });
});
