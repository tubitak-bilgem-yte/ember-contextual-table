import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dt-filterable-column-header', 'Integration | Component | dt filterable column header', {
  integration: true
});

test('it renders an input for filtering in simple form', function(assert) {
  assert.expect(2);

  this.set('eventFireCount', 0);
  this.on('myAction', function(filterText){
    this.set('eventFireCount', this.get('eventFireCount')+1);

    if (this.get('eventFireCount')===1) {
      assert.equal(filterText, 'jack');
    }
  });
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{dt-filterable-column-header onfilterupdated=(action 'myAction') placeholder='Filter...'}}`);

  assert.equal(this.$('input').text().trim(), '', 'Filter text is initially empty');
  assert.equal(this.$('input').attr('placeholder'), 'Filter...', 'Placeholder is passed to the input');
});
