# Extending

The extending system is intuitive. It uses the class `extends` mechanism.

You can define :

- type (offset 1) : the type value
- column (offset 2) : the column that is used for discrimination

If the type is not defined, it will use the class name as distinction

If the column is not defined, it will use a `type` column (as a string)

If an extended parent class is not configured with `@extends` keyword, it will
automatically retrive configuration from it's childs.

## Syntax


```php
<?php

  /**
   * @model
   */
  class Foo {

  }

  /**
   * @model
   */
  class Bar extends Foo {

  }
```

In this basic example, we have a `foo` model, and a `bar` model. The `Bar` class extends the `Foo` class, so pdoMap will deduce that the `foo` model is extending the `bar` model, by automatically using a `type` column and put the model name inside.

But you can also define it explicitely :

```php
<?php

  /**
   * @model('foo')
   */
  class Foo {

  }

  /**
   * @model
   * @extends(type => 'it-s-a-bar')
   */
  class Bar extends Foo {

  }
```

Be carefull, this keyword can lead to incoherent configuration. In that case the
system will simply warn you and stop generation for the specified model.

### Incoherent column name

```php
<?php

  /**
   * @model('foo')
   */
  class Foo {

  }

  /**
   * @extends(column => 'barType')
   */
  class Bar extends Foo {

  }

  /**
   * @extends(column => 'bazType')
   */
  class Baz extends Foo {

  }
```

Here `Foo` class is inherited by `Bar` and `Baz`, each having their own column name,
so the system will not be able to deduce what column to use to deshydrate records.
