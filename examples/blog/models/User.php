<?php

namespace model;

  /**
   * @model
   */
  class User {
    /**
     * @column(type => 'text')
     */
    protected $name;

    /**
     * @column(type => 'text')
     * @unique
     */
    protected $email;

    /**
     * @column(type => 'text')
     */
    protected $password;

    /**
     * Automatic callback when setting the password column
     */
    public function setPassword($pwd) {
      $this->password = md5($pwd);
    }

    /**
     * Helper for cheking a plain password with the encrypted one
     * @return boolean
     */
    public function checkPassword($pwd) {
      return $this->password === md5($pwd);
    }

  }
