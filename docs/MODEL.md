# Declaring a model

Each model class must at least contain a `@model` annotation.

## Model

- name (offset 1) : the model name
- table (offset 2) : the mapped table/repository name

If the name is not defined, it will be deduced from the class name (excluding its namespace). The camel case will be lower cased and separated with `_`.

If the table is not defined, it will be deduced from the name by adding
a `s` char to it's plural form (underscore lowered case)

### Syntax :

```php
<?php
  /**
   * @model
   * The deduced model name is foo_bar
   * The deduced table name is foo_bars
   */
  class FooBar {
    // ...
  }
  /**
   * @model('model_name', 'table_name')
   */
  class FooBar {
    // ...
  }
  /**
   * @model(table => 'table_name', name => 'model_name')
   */
  class FooBar {
    // ...
  }
```

## Primary key

- name (offset 1) : Defines the primary key of the class. If not defined, it will be deduced from the model name (underscored lowered case) + `_id`.

- type (offset 2) : Defines the column type

> Note : If you declare only one primary key finishing by `_id` the engine will by default consider it as a auto-incremented integer

- strategy (offset 3) : Defines the column incremental strategy (auto, hash(column, [algorithm]), rand, manuel)

> Note : if the strategy is not defined, if the type is a number, it will choose the auto increment stategy, otherwyse the rand stategy

### Syntax :

```php
<?php
  /**
   * @model('FooEntry')
   * The deduced primary key is : foo_entry_id
   */
  class Foo {
    // ...
  }
  /**
   * @model
   * @primary('foo_id')
   */
  class Foo {
    // ...
  }
  /**
   * @model
   * @primary(
   *  name => 'foo_key',
   *  type => @type('text', 16),
   *  strategy => 'rand'
   * )
   */
  class Foo {
    // ...
  }
  /**
   * @model
   * @primary(
   *  name => 'foo_key',
   *  type => @type('text', 32),
   *  strategy => @hash('url', 'md5')
   * )
   */
  class Foo {
    // ...
    /**
     * @column
     */
    protected $url;
  }  
```

## Composite primary keys

You can also declare a composed primary key with an array of column names, but this
feature is yet to come
