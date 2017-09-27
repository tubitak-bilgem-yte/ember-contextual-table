import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

var selection, deselection;

moduleForComponent('dt-selection-column-header', 'Integration | Component | dt selection column header', {
  integration: true,

  beforeEach() {
    selection = 0;
    deselection = 0;

    this.on('selected', function(){
      selection++;
    });

    this.on('deselected', function(){
      deselection--;
    });
  }
});

test('renders in basic form as default checkbox', function(assert) {
  this.render(hbs`{{dt-selection-column-header isSelected=true selected=(action 'selected') deselected=(action 'deselected')}}`);

  assert.equal(this.$('input:eq(0)').is(':checked'), true);

  this.$('input:eq(0)').prop('checked', false);
  this.$('input:eq(0)').change();
  assert.equal(deselection, -1);

  this.$('input:eq(0)').prop('checked', true);
  this.$('input:eq(0)').change();
  assert.equal(selection, 1);
});

test('renders in block form as button', function(assert) {
  this.set('selected', true);

  this.render(hbs`
    {{#dt-selection-column-header isSelected=selected selected=(action 'selected') deselected=(action 'deselected') as |col|}}
        <button onclick={{action col.change (if col.isSelected false true)}}>
          {{if col.isSelected 'Selected' 'Not Selected'}}-{{col.header}}
        </button>
    {{/dt-selection-column-header}}
  `);

  assert.equal(this.$('button').text().trim(), 'Selected-true');

  this.$('button').click();
  assert.equal(deselection, -1);
  this.set('selected', false);
  assert.equal(this.$('button').text().trim(), 'Not Selected-true');

  this.$('button').click();
  assert.equal(selection, 1);
  this.set('selected', true);
  assert.equal(this.$('button').text().trim(), 'Selected-true');
});
