<?php

namespace pdomap {
  class Session {
    protected $db;
    public function __construct(Connection $db) {
      $this->db = $db;
    }
    
  }
}
