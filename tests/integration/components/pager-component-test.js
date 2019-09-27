import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('pager-component', 'Integration | Component | pager component', {
  integration: true
});



test('renders in basic form and responds to actions', function(assert) {
  let nextCount = 0;
  let previousCount=0;
  this.on('nextPageRequested', function(){
    nextCount++;
  });

  this.on('previousPageRequested', function(){
    previousCount++;
  });

  this.render(hbs`
    {{pager-component next=(action 'nextPageRequested') previous=(action 'previousPageRequested') currentPage=currentPage previousDisabled=previousDisabled nextDisabled=nextDisabled}}
  `);

  assert.equal(this.$('a:eq(0)').text().trim(), "<");
  assert.equal(this.$('a:eq(1)').text().trim(), ">");

  this.set('currentPage',28);

  assert.equal(this.$('a:eq(0)').text().trim(), "<");
  assert.equal(this.$('a:eq(1)').text().trim(), "28");
  assert.equal(this.$('a:eq(2)').text().trim(), ">");

  this.$('a:eq(0)').click();
  this.$('a:eq(0)').click();
  this.$('a:eq(0)').click();
  assert.equal(previousCount, 3);
  assert.equal(nextCount, 0);

  this.$('a:eq(2)').click();
  this.$('a:eq(2)').click();
  assert.equal(nextCount, 2);
  assert.equal(previousCount, 3);


  assert.equal(this.$('li:eq(0)').attr('class'), '');
  assert.equal(this.$('li:eq(2)').attr('class'), '');

  this.set('previousDisabled', true);
  assert.equal(this.$('li:eq(0)').attr('class'), 'disabled');
  assert.equal(this.$('li:eq(2)').attr('class'), '');

  this.set('nextDisabled', true);
  assert.equal(this.$('li:eq(0)').attr('class'), 'disabled');
  assert.equal(this.$('li:eq(2)').attr('class'), 'disabled');
});



test('renders in block form and responds to actions', function(assert) {
  let nextCount = 0;
  let previousCount=0;
  this.on('nextPageRequested', function(){
    nextCount++;
  });

  this.on('previousPageRequested', function(){
    previousCount++;
  });

  this.render(hbs`
    {{#pager-component next=(action 'nextPageRequested') previous=(action 'previousPageRequested') as |block|}}
      {{#if block.previous}}
        Önceki
      {{else if block.next}}
        Sonraki
      {{/if}}
    {{/pager-component}}
  `);

  assert.ok(this.$('a:eq(0)').text().indexOf('Önceki')>=0);
  assert.ok(this.$('a:eq(1)').text().indexOf('Sonraki')>=0);

  this.$('a:eq(0)').click();
  this.$('a:eq(0)').click();
  this.$('a:eq(0)').click();
  assert.equal(previousCount, 3);
  assert.equal(nextCount, 0);

  this.$('a:eq(1)').click();
  this.$('a:eq(1)').click();
  assert.equal(nextCount, 2);
  assert.equal(previousCount, 3);
});
