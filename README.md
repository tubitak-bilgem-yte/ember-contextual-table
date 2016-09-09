# ember-contextual-table

[![npm version](https://badge.fury.io/js/ember-contextual-table.svg)](http://badge.fury.io/js/ember-contextual-table)
[![Build Status](https://travis-ci.org/tubitak-bilgem-yte/ember-contextual-table.svg?branch=master)](https://travis-ci.org/tubitak-bilgem-yte/ember-contextual-table)
[![Ember Observer Score](http://emberobserver.com/badges/ember-contextual-table.svg)](http://emberobserver.com/addons/ember-contextual-table)
[![Dependency Status](https://david-dm.org/tubitak-bilgem-yte/ember-contextual-table.svg)](https://david-dm.org/tubitak-bilgem-yte/ember-contextual-table)
[![devDependency Status](https://david-dm.org/tubitak-bilgem-yte/ember-contextual-table/dev-status.svg)](https://david-dm.org/tubitak-bilgem-yte/ember-contextual-table#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/tubitak-bilgem-yte/ember-contextual-table/badges/gpa.svg)](https://codeclimate.com/github/tubitak-bilgem-yte/ember-contextual-table)


Ember Table as a Contextual Component

## Motivation

ember-contextual-table is an addon developed based on [Open/Closed principle](https://en.wikipedia.org/wiki/Open/closed_principle) thanks to rocking Contextual Components concept of Ember.

The main idea behind developing yet another ember table is to avoid static column definition declarations within component.js files (hence inevitable usage of component helper within addon code to create components of developers dynamically at runtime) and give freedom to developers for customization via using contextual-table in block form.

ember-contextual-table does not do any magic at component lifecycle hooks to create and/or register to developers' custom column components. Its code is pretty simple and clear; at least we hope so. Feel free to contribute and comment.

### Usage Samples 

When using ember-contextual-table; you define your table in kind of a declarative way within template you are developing. Consider the simple example given below:

    {{#data-table data=data selectionMode='multiple' 
            selectionChanged=(action 'selectionChanged') classNames=tableClassNames as |t|}}
        {{t.selectionColumn}}
        {{t.column propertyName='name' name='Name'}}
        {{t.column propertyName='surname' name='Surname'}}
        {{t.column propertyName='age' name='Age'}}
        {{t.column propertyName='nationality' name='Nationality'}}
    {{/data-table}}

In this example; a selection column along with 4 other columns are declared so as to display related information of data as cell content. data-table component is used in block form and columns are used in non-block form. If some customization is desired; the columns can used in block form as well:

    {{#data-table data=data showFooter=true selectionMode='multi' selectionChanged=(action 'selectionChanged') as |t|}}
        {{t.selectionColumn}}
        {{#t.selectionColumn as |col|}}
            {{#if col.header}}
                is Selected?
            {{/if}}
            {{#if col.body}}
                <button class="btn btn-primary" data-toggle="button" 
                    aria-pressed="false" autocomplete="off"
                    {{action col.change (if col.isRowSelected false true)}} value={{col.isRowSelected}}>
                    {{if col.isRowSelected 'Selected' 'Not Selected'}}
                </button>
            {{/if}}
            {{#if col.footer}}
                {{if col.isSelected 'All is selected' 'Not all is selected'}}
            {{/if}}
        {{/t.selectionColumn}}
        {{t.column propertyName='name' name='Name'}}
        {{t.column propertyName='surname' name='Surname'}}
        {{#t.column as |col|}}
            {{#if col.header}}
                <span style='text-decoration: underline overline; color:pink'>Age</span>
            {{/if}}
            {{#if col.body}}
                {{col.row.age}}
            {{/if}}
            {{#if col.footer}}
                <b><i>{{totalAges}}</i></b>
            {{/if}}
        {{/t.column}}
        {{#t.column name='Nationality' defaultHeader=true as |col|}}
            {{col.row.nationality}}
        {{/t.column}}
        {{#t.column name='Order' defaultHeader=true as |col|}}
            {{col.index}}
        {{/t.column}}
    {{/data-table}}

In this more advanced example above; two selection columns are declared (yes you can define more than one selection column if you want; for whatever logical reason). The first one is a standard one where a checkbox appears inside the cell to indicate selection status of corresponding row; where as the second one is used in block form and a button is used as cell content. The second selection column contains if conditions in its block form usage. This is the way you can customize a column or a selection column. You declare your column's appearance for header, body, and even for footer within corresponding if block; i.e., `{{#if col.header}}...{{/if}}`. A similar customization is performed for 'Age' column in the example above.

### Power of Open/Closed Principle (Paginator Sample)

Paging/pagination is one of many features offered by various table components; hence we also included a few components in order to illustrate how paging can be achieved with ember-contextual-component. Instead of creating a pagination-data-table by extending data-table; (since this is an obvious violation of [favoring composition over inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance)) we again made use of ember's block form components. Consider the example given below:

    {{#data-paginator data=data pageSize=3 as |p|}}
        {{#data-table data=p.data selectionMode='multi' selectionChanged=(action 'selectionChanged') as |t|}}
            {{t.selectionColumn}}
            {{t.column propertyName='name' name='Name'}}
            {{t.column propertyName='surname' name='Surname'}}
            {{t.column propertyName='age' name='Age'}}
            {{t.column propertyName='nationality' name='Nationality'}}
        {{/data-table}}
        {{pager-component next=p.next previous=p.previous currentPage=p.currentPage
            nextDisabled=(if p.hasNext false true)}}
    {{/data-paginator}}

Data paginator component provided inside this addon can be used to create a paginator and the same data table definition in the simple example can be used to create a paginated table. Pager component provides functionality to traverse among pages.

### Demo App & Twiddles

 1. [Demo App Page](https://tubitak-bilgem-yte.github.io/ember-contextual-table/dist/index.html)
 2. [Demo App Repository](https://github.com/tubitak-bilgem-yte/ember-contextual-table-demo)

Check twiddle for quick demos:
 1. [Simple Table](https://ember-twiddle.com/6ef893dad915977f14d96274b23b72eb) 
 2. [Styling Table](https://ember-twiddle.com/72952ce22be2f6f2b5d8f30400d2f51c)
 3. [Resizable Column Table](https://ember-twiddle.com/8d12a4ddb466357171de8719a935880c)
 

