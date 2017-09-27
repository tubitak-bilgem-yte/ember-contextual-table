import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

var sneijder = {name:'Wesley', surname:'Sneijder', age:32, nationality:'Dutch'};
var podolski = {name:'Lukas', surname: 'Podolski', age:31, nationality:'German'};
var muslera = {name:'Fernando', surname:'Muslera', age:30, nationality:'Uruguayan'};
var selcuk = {name:'Selcuk', surname: 'Inan', age:31, nationality: 'Turkish'};
var chedjou = {name:'Aurélien', surname:'Chedjou', age:31, nationality:'Cameroonian'};

var players = [sneijder, podolski, muslera, selcuk, chedjou];

function assertPlayer(assert,index,player) {
  assert.equal(Ember.$(`tr:eq(${index})`).find("td:eq(1)").text().trim(), player['name']);
  assert.equal(Ember.$(`tr:eq(${index})`).find("td:eq(2)").text().trim(), player['surname']);
  assert.equal(Ember.$(`tr:eq(${index})`).find("td:eq(3)").text().trim(), player['age']);
  assert.equal(Ember.$(`tr:eq(${index})`).find("td:eq(4)").text().trim(), player['nationality']);
}


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


test('clear selectedRows after data has changed', function(assert) {
  var selectionCount = 0;
  this.on('selectionChanged', function(selectedRows){
    selectionCount=selectedRows.length;
  });
  this.set('data', players);

  this.render(hbs`
    {{#data-table data=data showFooter=true selectionMode='multi' selectionChanged=(action 'selectionChanged') as |t|}}
      {{t.selectionColumn}}
      {{t.column propertyName='name' name='Name'}}
      {{t.column propertyName='surname' name='Surname'}}
      {{t.column propertyName='age' name='Age'}}
      {{t.column propertyName='nationality' name='Nationality'}}
    {{/data-table}}
  `);

  assert.equal(selectionCount, 0);

  this.$("input[type='checkbox']:eq(3)").prop('checked', true);
  this.$("input[type='checkbox']:eq(3)").change();
  assert.equal(selectionCount, 1);

  this.$("input[type='checkbox']:eq(2)").prop('checked', true);
  this.$("input[type='checkbox']:eq(2)").change();
  assert.equal(selectionCount, 2);

  let newData = Ember.A();
  newData.pushObjects(players);
  this.set('data', newData);
  assert.notOk(this.$("input[type='checkbox']:eq(0)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(1)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(2)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(3)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(4)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(5)").prop('checked'));

  this.$("input[type='checkbox']:eq(3)").prop('checked', true);
  this.$("input[type='checkbox']:eq(3)").change();
  assert.equal(selectionCount, 1);

  Ember.run(()=> {
    newData.clear();
    newData.pushObjects(players);
  });
  assert.notOk(this.$("input[type='checkbox']:eq(0)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(1)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(2)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(3)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(4)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(5)").prop('checked'));
});


test('selectedRows are managed from user of data-table', function(assert) {
  var parentSelectedRows = [players[0], players[2]];
  var resultOfSelection = [];

  this.set('data', players);
  this.set('parentSelectedRows', parentSelectedRows);
  this.on('selectionChanged', function(selectedRows){
    resultOfSelection = selectedRows;
  });

  this.render(hbs`
    {{#data-table data=data showFooter=true selectionMode='multi' selectionChanged=(action 'selectionChanged') 
          selectedRows=parentSelectedRows as |t|}}
      {{t.selectionColumn}}
      {{t.column propertyName='name' name='Name'}}
      {{t.column propertyName='surname' name='Surname'}}
      {{t.column propertyName='age' name='Age'}}
      {{t.column propertyName='nationality' name='Nationality'}}
    {{/data-table}}
  `);

  assert.equal(parentSelectedRows.length, 2);

  this.$("input[type='checkbox']:eq(3)").prop('checked', true);
  this.$("input[type='checkbox']:eq(3)").change();
  assert.equal(parentSelectedRows.length, 2);
  assert.equal(resultOfSelection.length, 3);

  this.$("input[type='checkbox']:eq(0)").prop('checked', false);
  this.$("input[type='checkbox']:eq(0)").change();
  assert.equal(resultOfSelection.length, 0);

  this.$("input[type='checkbox']:eq(0)").prop('checked', true);
  this.$("input[type='checkbox']:eq(0)").change();
  assert.equal(resultOfSelection.length, players.length);

  this.set('parentSelectedRows', [players[1]]);
  assert.notOk(this.$("input[type='checkbox']:eq(0)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(1)").prop('checked'));
  assert.ok(this.$("input[type='checkbox']:eq(2)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(3)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(4)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(5)").prop('checked'));

  this.set('parentSelectedRows', [players[1], players[3]]);
  assert.notOk(this.$("input[type='checkbox']:eq(0)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(1)").prop('checked'));
  assert.ok(this.$("input[type='checkbox']:eq(2)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(3)").prop('checked'));
  assert.ok(this.$("input[type='checkbox']:eq(4)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(5)").prop('checked'));


  let newData = Ember.A();
  newData.pushObjects(players);
  this.set('data', newData);
  this.set('parentSelectedRows', []);
  assert.notOk(this.$("input[type='checkbox']:eq(0)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(1)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(2)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(3)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(4)").prop('checked'));
  assert.notOk(this.$("input[type='checkbox']:eq(5)").prop('checked'));
});


test('column yield values', function(assert) {
  this.set('data', [sneijder]);

  this.render(hbs`
    {{#data-table data=data showFooter=true selectionMode='multi' as |t|}}
      {{#t.selectionColumn as |col|}}
        {{col.rowIndex}}-selection-{{col.isRowSelected}}-{{col.body}}
      {{/t.selectionColumn}}
      {{#t.column propertyName='name' name='Name' as |col|}}
         {{col.row.surname}}-{{col.rowIndex}}-{{col.body}}
      {{/t.column}}
    {{/data-table}}
   `);

  assert.equal(this.$('td:eq(0)').text().trim(), '0-selection-false-true');
  assert.equal(this.$('td:eq(1)').text().trim(), 'Sneijder-0-true');
});


test('create extra row', function(assert) {
  this.set('data', [sneijder]);

  this.render(hbs`
    {{#data-table data=data selectionMode='multi' as |t|}}
      {{t.column propertyName='name' name='Name'}}
      {{#t.extraRow as |er|}}
        <td class="logger">
        {{er.row.surname}}-{{er.isRowSelected}}-{{er.rowIndex}}
        </td>
      {{/t.extraRow}}
    {{/data-table}}
   `);

  assert.equal(this.$('tbody>tr').length, 1+1);
  assert.equal(this.$('.logger').text().trim(), 'Sneijder-false-0');
});

test('default row id', function(assert) {
  this.set('data', players);

  this.render(hbs`
    {{#data-table data=data selectionMode='multi' as |t|}}
      {{t.column propertyName='name' name='Name'}}
    {{/data-table}}
   `);

  assert.equal(this.$('#table-row-id-0>td:eq(0)').text().trim(), 'Wesley');
  assert.equal(this.$('#table-row-id-1>td:eq(0)').text().trim(), 'Lukas');
  assert.equal(this.$('#table-row-id-2>td:eq(0)').text().trim(), 'Fernando');
  assert.equal(this.$('#table-row-id-3>td:eq(0)').text().trim(), 'Selcuk');
  assert.equal(this.$('#table-row-id-4>td:eq(0)').text().trim(), 'Aurélien');
});

test('custom row id prefix', function(assert) {
  this.set('data', players);

  this.render(hbs`
    {{#data-table data=data rowIdPrefix='my-row-id' selectionMode='multi' as |t|}}
      {{t.column propertyName='name' name='Name'}}
    {{/data-table}}
   `);

  assert.equal(this.$('#my-row-id-0>td:eq(0)').text().trim(), 'Wesley');
  assert.equal(this.$('#my-row-id-1>td:eq(0)').text().trim(), 'Lukas');
  assert.equal(this.$('#my-row-id-2>td:eq(0)').text().trim(), 'Fernando');
  assert.equal(this.$('#my-row-id-3>td:eq(0)').text().trim(), 'Selcuk');
  assert.equal(this.$('#my-row-id-4>td:eq(0)').text().trim(), 'Aurélien');

});




test('dblclick on row triggers selectionchange action', function(assert) {
  var selectionChangedCallCount = 0;

  this.set('data', players);
  this.on('selectionChanged', function(selectedRows){
    if (selectionChangedCallCount === 0) {
      assert.equal(selectedRows.length, 1, 'only one cell is selected');
      assert.equal(selectedRows[0]['surname'], 'Muslera');
    } else if (selectionChangedCallCount === 1) {
      assert.equal(selectedRows.length, 0, 'selection cleared');
    }

    selectionChangedCallCount++;
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

  assert.equal(selectionChangedCallCount, 0);


  this.$("tr:eq(3)")[0].dispatchEvent(new MouseEvent('dblclick', {}));
  assert.equal(selectionChangedCallCount, 1);

  this.$("tr:eq(3)")[0].dispatchEvent(new MouseEvent('dblclick', {}));
  assert.equal(selectionChangedCallCount, 2);

});
