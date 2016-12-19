<?php

namespace {

  trait ActiveRecord {

    protected $_session;
    protected $_data;
    protected $_changes = array();

    public function __construct($session, $data) {
      $this->_session = $session;
      $this->_data = $data;
    }

    /**
     * Saves the current record
     */
    public function save() {
      if (!empty($this->_changes)) {
        if (empty($this->_data)) {
          // record is new
        } else {
          // update the record
        }
        $this->_changes = array();
      }
      return $this;
    }

    /**
     * Deletes the current record
     */
    public function delete() {
      if (!empty($this->_data)) {

      }
      return $this;
    }

    /**
     * Check if property is defined
     */
    public function __isset($property) {
      return isset($this->_data[$property]) || isset($this->_);
    }

    public function __get($property) {
      if (isset($this->_data[$property])) {
        return $this->_data[$property];
      } else {
        return null;
      }
    }

    public function __set($property, $value) {

    }

    public function __toString() {

    }

  }
}
