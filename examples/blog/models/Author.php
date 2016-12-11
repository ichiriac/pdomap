<?php

namespace model;

  /**
   * @model
   */
  class Author extends User {

    /**
     * @has_many('post')
     */
    protected $posts;

  }
