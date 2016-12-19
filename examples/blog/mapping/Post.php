<?php
namespace nsName;


/**
   * Class
   */
class OutputModel extends OriginalClass
{

    /**
     * Primary key name(s)
     */
    public static $primaryKey = "...";
    /**
     * Table name
     */
    public static $tableName = "...";
    /**
     * Model name
     */
    public static $modelName = "...";
    // mapping data

    protected static $__mapping = array();
    protected $session;

    public function __construct($data = null)
    {
        $this->property = $data["column"];
        parent::__construct();
    }

    public static function hydrate()
    {
        
        //

    }

    public static function deshydrate($item)
    {
        $object = new self();
    }
}

