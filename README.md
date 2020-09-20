# sqlbars

It's Handlebars! But for SQL!

## Why?

Sometimes, you have to write some SQL that just doesn't map well to an ORM.

With this wrapper around Handlebars, you can now do so with a little more safety and convenience.

## helpers

### `{{sql}}`

```
  {{sql null}} // result is NULL
  {{sql val}} // with data { val: null }, result is NULL
  {{sql val}} // with data { val: undefined }, result is NULL

  {{sql true}} // result is TRUE
  {{sql false}} // result is FALSE
  {{sql val}} // with data { val: true }, result is TRUE
  {{sql val}} // with data { val: false }, result is FALSE

  {{sql 1.0}} // result is 1.0
  {{sql val}} // with data { val: 1.0 }, result is 1.0

  {{sql "foo"}} // result is 'foo'
  {{sql val}} // with data { val: "foo" }, result is 'foo'

  {{sql "'foo'"}} // result is '\'foo\''
  {{sql val}} // with data { val: "'foo'" }, result is '\'foo\''

  {{sql 1 2 3}} // result is (1, 2, 3)
  {{sql val}} // with data { val: [1, 2, 3] }, result is (1, 2, 3)
```

`{{sql}}` converts all values passed in to SQL-compatible types,
and escapes any special characters as needed


### `{{sql-id}}`

```
  {{sql-id "foo"}} // result is `foo`
  {{sql-id "`foo`"}} // result is ```foo```

  {{sql-id "foo" "bar"}} // result is `foo`.`bar`
  {{sql val}} // with data { val: [ 'foo', 'bar' ] }, result is `foo`.`bar`
```

`{{sql-id}}` is a utility to create a safely escaped SQL identifier (a database, table, or column name).
When given multiple arguments, or a single argument that is an array, the identifiers are joined together with '.'

### `{{sql-list}}`

```
{{sql-list null}} // result is NULL
{{sql-list val}} // with data { val: null }, result is NULL
{{sql-list val}} // with data { val: undefined }, result is NULL

{{sql-list true}} // result is TRUE
{{sql-list false}} // result is FALSE
{{sql-list val}} // with data { val: true }, result is TRUE
{{sql-list val}} // with data { val: false }, result is FALSE

{{sql-list 1.0}} // result is 1.0
{{sql-list val}} // with data { val: 1.0 }, result is 1.0

{{sql-list "foo"}} // result is 'foo'
{{sql-list val}} // with data { val: "foo" }, result is 'foo'

{{sql-list "'foo'"}} // result is '\'foo\''
{{sql-list val}} // with data { val: "'foo'" }, result is '\'foo\''

{{sql-list 1 2 3}} // result is 1, 2, 3
{{sql-list val}} // with data { val: [1, 2, 3] }, result is 1, 2, 3
```

`{{sql-list}}` converts all values passed in to SQL-compatible types in an almost identical way as `{{sql}}`,
with the exception of not adding the outermost set of parentheses to lists of results.  This is useful for building lists for certain sql statements,
such as `INSERT VALUES ...`;


### `{{sql-limit}}`

```
  {{sql-limit 1}} // result is 1
  {{sql-limit '1'}} // result is 1

  {{sql-limit 1.5}} // result is 1
  {{sql-limit '1.5'}} // result is 1

  {{sql-limit -1}} // result is value of MAX_LIMIT (999999999999)
  {{sql-limit '-1'}} // result is value of MAX_LIMIT (999999999999)

  {{sql-limit}} // result is value of MAX_LIMIT (999999999999)
```

`{{sql-limit}}` is a utility to safely parse its argument into a limit value, that will always be a non-negative integer.
`{{sql-limit}}` does not generate the LIMIT keyword, just the numberical value.  This is so you can use it as a number in checks, or set variable values.
If `{{sql-limit}}` is given a negative number, it assumes that means no limit, and outputs the MAX_LIMIT value.


### `{{sql-offset}}`

```
  {{sql-offset 1}} // result is 1
  {{sql-offset '1'}} // result is 1

  {{sql-offset 1.5}} // result is 1
  {{sql-offset '1.5'}} // result is 1

  {{sql-offset -1}} // throws an Error
  {{sql-offset -1}} // throws an Error

  {{sql-offset}} // result is 0
```

`{{sql-offset}}` is a utility to safely parse its argument into a offset value, that will always be a non-negative integer.
`{{sql-offset}}` does not generate the OFFSET keyword, just the numberical value.  This is so you can use it as a number in checks, or set variable values.
If `{{sql-offset}}` is given a negative number, it throws an error.


### `{{sql-order}}`

```
  {{sql-order "foo"}} // result is `foo` ASC
  {{sql-order "+foo"}} // result is `foo` ASC
  {{sql-order "-foo"}} // result is `foo` DESC

  {{sql-order "+foo" "-bar"}} // result is `foo` ASC, `bar` DESC

  {{sql-order val}} // if val is ['+foo', '-bar'], result is `foo` ASC, `bar` DESC

  {{sql-order val "cab"}} // if val is ['+foo', '-bar'], result is `foo` ASC, `bar` DESC, `cab` ASC
```

`{{sql-order}}` is a utility to generate a sequence of properties to order by.
`{{sql-order}}` does not generate the ORDER BY keywords, just the ordering sequence.
`{{sql-order}}` accepts any number of strings or arrays, and flattens them out into a single ordering sequence


### `{{and}}`

```
  {{#if (and a b)}}foo{{/if}} // with data { a: true, b: true } result is foo
  {{#if (and a b)}}foo{{/if}} // with data { a: true, b: false } result is empty string
  {{#if (and a b)}}foo{{/if}} // with data { a: false, b: true } result is empty string
  {{#if (and a b)}}foo{{/if}} // with data { a: false, b: false } result is empty string
```

`{{and}}` is a logical operator that takes any number of arguments, coerces them into booleans, and returns the logical and of all of them.


### `{{or}}`

```
  {{#if (or a b)}}foo{{/if}} // with data { a: true, b: true } result is foo
  {{#if (or a b)}}foo{{/if}} // with data { a: true, b: false } result is foo
  {{#if (or a b)}}foo{{/if}} // with data { a: false, b: true } result is foo
  {{#if (or a b)}}foo{{/if}} // with data { a: false, b: false } result is empty string
```

`{{or}}` is a logical operator that takes any number of arguments, coerces them into booleans, and returns the logical or of all of them.


### `{{not}}`

```
  {{#if (not a)}}foo{{/if}} // with data { a: true } result is empty string
  {{#if (not a)}}foo{{/if}} // with data { a: false } result is foo
```

`{{not}}` is a logical operator that takes one argument, coerces it into a boolean, and returns the logical not of it.
