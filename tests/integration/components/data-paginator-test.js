import { run } from '@ember/runloop';
import { A } from '@ember/array';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

var sneijder = {name:'Wesley', surname:'Sneijder', age:32, nationality:'Dutch'};
var podolski = {name:'Lukas', surname: 'Podolski', age:31, nationality:'German'};
var muslera = {name:'Fernando', surname:'Muslera', age:30, nationality:'Uruguayan'};
var selcuk = {name:'Selcuk', surname: 'Inan', age:31, nationality: 'Turkish'};
var chedjou = {name:'Aurélien', surname:'Chedjou', age:31, nationality:'Cameroonian'};

var players = A([sneijder, podolski, muslera, selcuk, chedjou]);

moduleForComponent('data-paginator', 'Integration | Component | data paginator', {
  integration: true
});

test('data slicing works', function(assert) {
  this.set('data', players);

  this.render(hbs`
    {{#data-paginator data=data pageSize=3 as |p|}}
      <span class='testspan'>{{p.data.length}}-{{p.currentPage}}-{{p.hasNext}}</span>
      {{pager-component next=p.next previous=p.previous}}
    {{/data-paginator}}
  `);

  assert.equal(this.$(".testspan").text().trim(), '3-1-true');

  this.$('a:eq(1)').click();
  assert.equal(this.$(".testspan").text().trim(), '2-2-false');
});


test('dataRequested action handling works', function(assert) {
  this.set('paginatedData', players.slice(0, 3));
  var that = this;
  let offset, limit;
  this.on('dataRequested', function(offsetParam, limitParam){
    offset = offsetParam;
    limit = limitParam;
    that.set('paginatedData', players.slice(offsetParam, offsetParam+limitParam));
  });

  this.render(hbs`
    {{#data-paginator paginatedData=paginatedData dataRequested=(action 'dataRequested') pageSize=3 as |p|}}
      <span class='testspan'>{{p.data.length}}-{{p.currentPage}}</span>
      {{pager-component next=p.next previous=p.previous}}
    {{/data-paginator}}
  `);

  assert.equal(this.$(".testspan").text().trim(), '3-1');
  assert.notOk(offset);
  assert.notOk(limit);

  this.$('a:eq(1)').click();
  assert.equal(this.$(".testspan").text().trim(), '2-2');
  assert.equal(offset, 3);
  assert.equal(limit, 3);
});


test('pushing new item to data works', function(assert) {
  this.set('data', players);

  this.render(hbs`
    {{#data-paginator data=data pageSize=3 as |p|}}
      <span class='testspan'>{{p.data.length}}-{{p.currentPage}}-{{p.hasNext}}</span>
      {{pager-component next=p.next previous=p.previous}}
    {{/data-paginator}}
  `);

  assert.equal(this.$(".testspan").text().trim(), '3-1-true');

  this.$('a:eq(1)').click();
  assert.equal(this.$(".testspan").text().trim(), '2-2-false');


  run(()=>{
    players.pushObject({name:'Lionel', surname:'Carole', age:25, nationality:'French'});
  });

  assert.equal(this.$(".testspan").text().trim(), '3-2-true');
});
