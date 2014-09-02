
# XSQL

```js
var Xsql = require('xsql');
var x = new Xsql({dialect:'mysql'});
```

```js
var query = [
  x.select(x.names(['col1','col2'],'tbl')),
  x.from(x.name('tbl')),
  x.where(x.eq(x.name('id','tbl'),2)),
  ';'
].join(' ');
```

```sql
select `tbl`.`col1`,`tbl`.`col2` from `tbl` where `tbl`.`id`=2 ;
```


---


## Primitives

- **`quotes`**     : [`String`]
- **`wrap`**       : [`String`, `Undefined|String`]
- **`escape`**     : [`String`]
- **`string`**     : [`String`, `Undefined|String`]


- **`name`**       : [`String`, `Undefined|String`, `Undefined|String`]
- **`names`**      : [`Array`, `Undefined|String`, `Undefined|String`]
- **`schema`**     : [`Undefined|String`]
- **`as`**         : [`String`, `String`]
- **`alias`**      : [`String`, `String`]
- **`func`**       : [`String`, `String|Array`, `Undefined|String`]
- **`select`**     : [`String|Array`]
- **`from`**       : [`String`]
- **`join`**       : [`String`, `String|Array`, `Undefined|String`]
- **`eq`**         : [`String`, `String|Number|Null`]
- **`eqv`**        : [`String`, `Undefined|Null|String|Number|Boolean`]
- **`groupby`**    : [`String|Array`]
- **`orderby`**    : [`String|Object|Array`, `Undefined|String`]
- **`limit`**      : [`Number`, `Number`]
- **`in`**         : [`String|Number|Array`]
- **`and`**        : [`String|Array`]
- **`or`**         : [`String|Array`]
- **`between`**    : [`String|Number`, `String|Number`]
- **`like`**       : [`String`]
- **`where`**      : [`String|Array`, `Undefined|String`]
- **`insert`**     : [`String`, `String|Array`, `String|Array`]
- **`update`**     : [`String`, `String|Array`, `String|Array`]
- **`delete`**     : [`String`]


---


## Examples

### Functions

```js
var x = new xsql({dialect:'mysql'});

var concat = x.func('concat_ws',[
  x.wrap(' '),
  x.name('col1','tbl'),
  x.name('col2','tbl')
]);

var group = x.func('group_concat',['distinct', concat],' ');

var partial = x.as(group,x.name('alias'));
```

```sql
group_concat(distinct concat_ws(' ',`tbl`.`col1`,`tbl`.`col2`)) as `alias`
```

### Join Tables

```js
var query = [
  x.select([x.name('col','tbl1'),x.name('col','tbl2')]),
  x.from(x.name('tbl1')),
  x.join(x.name('tbl2'),x.eq(x.name('id','tbl1'),x.name('id','tbl2')),'left'),
  ';'
].join(' ');
```

```sql
select `tbl1`.`col`,`tbl2`.`col` from `tbl1`
  left join `tbl2` on `tbl1`.`id`=`tbl2`.`id` ;
```

### PostgreSQL Schema

###### public by default
```js
var x = new xsql({dialect:'pg'});
var query = [
  x.select(x.name('col','tbl',x.schema())),
  x.from(x.name('tbl',x.schema())),
  ';'
].join(' ');
```

```sql
select "public"."tbl"."col" from "public"."tbl" ;
```

###### globally defined

```js
var x = new xsql({dialect:'pg', schema:'y'});
var query = [
  x.select(x.name('col','tbl',x.schema())),
  x.from(x.name('tbl',x.schema())),
  ';'
].join(' ');
```

```sql
select "y"."tbl"."col" from "y"."tbl" ;
```

###### specify schema

```js
var x = new xsql({dialect:'pg', schema:'y'});
var query = [
  x.select(x.name('col','tbl',x.schema('z'))),
  x.from(x.name('tbl',x.schema())),
  ';'
].join(' ');
```

```sql
select "z"."tbl"."col" from "y"."tbl" ;
```

###### skip on other dialects

```js
var x = new xsql({dialect:'sqlite'});
var query = [
  x.select(x.name('col','tbl',x.schema('z'))),
  x.from(x.name('tbl',x.schema())),
  ';'
].join(' ');
```

```sql
select "tbl"."col" from "tbl" ;
```


---


### Wrapping it up

#### concat
```js
function concat(columns, separator) {
  return (/mysql|pg/.test(x.dialect))
    ? x.func('concat_ws',[x.wrap(separator),columns])
    // sqlite
    : columns.join("||'"+separator+"'||");
}
```
###### mysql
```js
var x = new xsql({dialect:'mysql'});
var partial = concat([x.name('col1','tbl'), x.name('col2','tbl')],',');
```
```sql
concat_ws(',',`tbl`.`col1`,`tbl`.`col2`)
```
###### sqlite
```js
var x = new xsql({dialect:'sqlite'});
var partial = concat([x.name('col1','tbl'), x.name('col2','tbl')],',');
```
```sql
"tbl"."col1"||','||"tbl"."col2"
```

#### group
```js
function group (columns) {
  return (/mysql|sqlite/.test(x.dialect))
    ? x.func('group_concat',['distinct',columns],' ')
    // pg
    : x.func('string_agg',['distinct',[columns,x.wrap(',')].join()],' ')
}
```
###### mysql
```js
var x = new xsql({dialect:'mysql'});
var partial = group([x.name('col1','tbl'), x.name('col2','tbl')],',');
```
```sql
group_concat(distinct `tbl`.`col1`,`tbl`.`col2`)
```
###### pg
```js
var x = new xsql({dialect:'pg'});
var partial = group([x.name('col1','tbl'), x.name('col2','tbl')],',');
```
```sql
string_agg(distinct "tbl"."col1","tbl"."col2",',')
```


---

## License

MIT
