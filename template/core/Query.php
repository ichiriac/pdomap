<?php
  namespace pdomap {
    trait Query {
      /**
       * Using the find method, you can retrieve the object corresponding
       * to the specified primary key that matches any supplied options.
       */
      public static function find($index) {
        if (func_num_args() > 0) {
          $index = func_get_args();
        }
      }

      /**
       * The first method finds the first record ordered by
       * primary key (default).
       */
      public static function first($limit = 1) {
        return self::where()->limit($limit);
      }

      /**
       * The last method finds the last record ordered by
       * primary key (default).
       */
      public static function last($limit = 1) {
        return self::where()->limit($limit);
      }

      /**
       * The find_by method finds the first record
       * matching some conditions.
       */
      public static function findBy($column, $value) {

      }

      /**
       * If you'd like to use your own SQL to find records in a table you
       * can use find_by_sql. The find_by_sql method will return an array
       * of objects even if the underlying query returns just a single record.
       */
      public static function findBySql($sql) {
        return self::where()->sql($sql);
      }

      /**
       * If you'd like to use your own SQL to find records in a table you
       * can use find_by_sql. The find_by_sql method will return an array
       * of objects even if the underlying query returns just a single record.
       */
      public static function select($columns) {
        return self::where()->select($columns);
      }

      /**
       * If you'd like to use your own SQL to find records in a table you
       * can use find_by_sql. The find_by_sql method will return an array
       * of objects even if the underlying query returns just a single record.
       */
      public static function includes($relation) {
        return self::where()->includes($relation);
      }


      /**
       * The where method allows you to specify conditions
       * to limit the records returned, representing the
       * WHERE-part of the SQL statement. Conditions can either
       * be specified as a string, array, or hash.
       */
      public static function where($condition = null, array $parameters = null) {
        return new Request(
          self::$modelName
        );
      }
    }
  }
