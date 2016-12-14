<?php
namespace nsName;

class OutputModel extends OriginalClass
{

    public static $primaryKey = "...";
    public static $tableName = "...";
    public static $modelName = "...";
    protected $session;

    public function __construct($data = null)
    {
        $this->property = $data["column"];
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

