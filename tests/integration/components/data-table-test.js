import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

var sneijder = {name:'Wesley', surname:'Sneijder', age:32, nationality:'Dutch'};
var podolski = {name:'Lukas', surname: 'Podolski', age:31, nationality:'German'};
var muslera = {name:'Fernando', surname:'Muslera', age:30, nationality:'Uruguayan'};
var selcuk = {name:'Selcuk', surname: 'Inan', age:31, nationality: 'Turkish'};
var chedjou = {name:'Aurélien', surname:'Chedjou', age:31, nationality:'Cameroonian'};

var players = [sneijder, podolski, muslera, selcuk, chedjou];

moduleForComponent('data-table', 'Integration | Component | data table', {
  integration: true
});

test('renders table and responds to selections and deselections', function(assert) {
  var selectionCount = 0;

  this.set('data', players);
  this.on('selectionChanged', function(selectedRows){
    if (selectionCount === 0) {
      assert.equal(selectedRows.length, 1);
      assert.equal(selectedRows[0]['surname'], 'Muslera');
    } else if (selectionCount === 1) {
      assert.equal(selectedRows.length, 5);
    } else {
      assert.equal(selectedRows.length, 0);
    }

    selectionCount++;
  });

  this.render(hbs`
    {{#data-table data=data showFooter=true selectionMode='multi' selectionChanged=(action 'selectionChanged') as |t|}}
      {{t.selectionColumn}}
      {{t.column propertyName='name' name='Name'}}
      {{t.column propertyName='surname' name='Surname'}}
      {{t.column propertyName='age' name='Age'}}
      {{t.column propertyName='nationality' name='Nationality'}}
    {{/data-table}}
  `);

  assert.equal(this.$("th:eq(1)").text().trim(), 'Name');
  assert.equal(this.$("th:eq(2)").text().trim(), 'Surname');
  assert.equal(this.$("th:eq(3)").text().trim(), 'Age');
  assert.equal(this.$("th:eq(4)").text().trim(), 'Nationality');

  assertPlayer(assert,1,sneijder);
  assertPlayer(assert,2,podolski);
  assertPlayer(assert,3,muslera);
  assertPlayer(assert,4,selcuk);
  assertPlayer(assert,5,chedjou);

  assert.equal(this.$("tfoot>tr>td").length, 5);

  assert.equal(selectionCount, 0);

  this.$("input[type='checkbox']:eq(3)").prop('checked', true);
  this.$("input[type='checkbox']:eq(3)").change();
  assert.equal(selectionCount, 1);

  this.$("input[type='checkbox']:eq(0)").prop('checked', true);
  this.$("input[type='checkbox']:eq(0)").change();
  assert.equal(selectionCount, 2);

  this.$("input[type='checkbox']:eq(0)").prop('checked', false);
  this.$("input[type='checkbox']:eq(0)").change();
  assert.equal(selectionCount, 3);
});

test('renders custom header and footer', function(assert) {
  this.set('data', players);
  this.on('selectionChanged', function(){
    return;
  });

  this.render(hbs`
    {{#data-table data=data customHeader=(component 'pager-component') 
        customFooter=(component 'pager-component') showFooter=true 
        selectionMode='multi' selectionChanged=(action 'selectionChanged') as |t|}}
      {{t.selectionColumn}}
      {{t.column propertyName='name' name='Name'}}
      {{t.column propertyName='surname' name='Surname'}}
      {{t.column propertyName='age' name='Age'}}
      {{t.column propertyName='nationality' name='Nationality'}}
    {{/data-table}}
  `);

  assert.equal(this.$("thead").length, 0);
  assert.equal(this.$("tfoot").length, 0);
  assert.equal(this.$("li").length, 4);
});

function assertPlayer(assert,index,player) {
  assert.equal(this.$(`tr:eq(${index})`).find("td:eq(1)").text().trim(), player['name']);
  assert.equal(this.$(`tr:eq(${index})`).find("td:eq(2)").text().trim(), player['surname']);
  assert.equal(this.$(`tr:eq(${index})`).find("td:eq(3)").text().trim(), player['age']);
  assert.equal(this.$(`tr:eq(${index})`).find("td:eq(4)").text().trim(), player['nationality']);
}
