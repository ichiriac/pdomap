# Indexing

You can define indexing strategies (multiple times, or combined) :

## Index

This will improve requests avec the database, but slow other actions like inserting,
updating, or deleting data. You may create indexes for criterias but not too much.

```php
<?php

  /**
   * @model
   * @index(name => 'findByName', properties => ['category', 'name'])
   */
  class Foo {

  }
```

In this example a new index will be created on columns `category` and `name`.

An automated method `findByName` with the specified arguments will also be automatically
created.

## Unique

The unique index is similar to previous index, but will not create an automatic method
and will ensure the unicity of the specified data.

If you need only a column to be unique, you can also define it directly on the property.

```php
<?php

  /**
   * @model
   * @unique(properties => ['category', 'name'])
   */
  class Foo {
    /**
     * @column('string')
     * @unique
     */
    protected $email;
  }
```

> Note : no need to create an index on a unique constraint, it's already indexed

## Search

The search column uses the full search capabilities in order to index the data.
It uses the same declaration style as `unique`, but with an additionnal name parameter, and
will as `index` generate a method.

```php
<?php

  /**
   * @model
   * @search(name => 'findByName', properties => ['category', 'name'])
   */
  class Foo {
    /**
     * @column('string')
     * @search
     */
    protected $email;
  }
```
> If it's defined on a property without the name argument, it will automatically generate a method findBy + the name of the property (ex: findByEmail)
