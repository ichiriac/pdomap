# Association Callbacks

Association callbacks are similar to normal callbacks, but they are triggered by events in the life cycle of a collection. There are four available association callbacks:

- before_add
- after_add
- before_remove
- after_remove

## Sample

```php
<?php
  /**
   * @model('author')
   */
  class Author {
    /**
     * @has_many('books')
     * @before_add(['check_credit_limit',...])
     */
    protected $books;

    /**
     * Check if the credit limit is ok
     * @return boolean
     */
    public function check_credit_limit() {
      // using just a boolean
      return $this->credit > 0;
      // triggering a message
      return $this->credit > 0 ?
        true : throw new Exception('Custom message error')
      ;
    }
  }
```
