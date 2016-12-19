<?php

namespace nsName {

  /**
   * Class
   */
  class OutputModel extends OriginalClass {

    use \ns\ActiveRecord;

    /**
     * Primary key name(s)
     */
    public static $primaryKey = '...';

    /**
     * Table name
     */
    public static $tableName = '...';

    /**
     * Model name
     */
    public static $modelName = '...';

    // mapping data
    protected static $__mapping = array();

    protected $session;

    public function __construct(array $data = null) {
      $this->property = $data['column'];
      parent::__construct();
    }

    public static function hydrate() {
      //
    }
    public static function deshydrate(array $item) {
      $object = new self();

    }
  }
}
