<?php

  namespace pdomap {
    /**
     * The requesting class
     */
    class Request implements \Iterator {

      protected $sql;
      protected $columns = '*';
      protected $model;
      protected $order;
      protected $criteria;
      protected $limit;
      protected $parameters;

      /**
       * Init the request
       */
      public function __construct($model, $criteria, array $parameters = null) {
        $this->model = $model;
        $this->parameters = $parameters;
      }

      public function includes($relation) {

      }

      public function count() {

      }

      public function exists() {
        return $this->count() > 0;
      }


      public function many() {
        return $this->count() > 1;
      }

      public function average($column) {

      }

      public function minimum($column) {

      }

      public function maximum($column) {

      }

      public function sum($column) {

      }

      public function pluck($columns) {

      }

      public function explain() {

      }

      /**
       * @return Request
       */
      public function limit($start = 0, $size = false) {
        if (empty($this->limit)) {
          $this->limit = array();
        }
        if ($size === false) {
          $this->limit[1] = $start; // size
        } else {
          $this->limit[0] = $start; // offset
          $this->limit[1] = $size; // size
        }
        return $this;
      }

      /**
       * Selects specified columns
       */
      public function select($columns) {

      }

      /**
       * @return Request
       */
      public function offset($start = 0) {
        if (empty($this->limit)) {
          $this->limit = array();
        }
        $this->limit[0] = $start;
        return $this;
      }

      /**
       * @return mixed
       */
      public function current() {

      }

      /**
       * @return scalar
       */
      public function key() {

      }

      /**
       * @return void
       */
      public function next() {

      }
      /**
       * @return void
       */
      public function rewind() {

      }
      /**
       * @return boolean
       */
      public function valid() {

      }
    }
  }
