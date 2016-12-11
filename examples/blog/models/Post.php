<?php

namespace model;

  /**
   * @model
   */
  class Post {
    /**
     * @column(type => 'text', size => 255)
     */
    protected $title;

    /**
     * @column(type => 'text', size => 64)
     */
    protected $slug;

    /**
     * @column(type => 'text', size => 'large')
     */
    protected $body;

    /**
     * @has_many('tag')
     * @through(table => 'post_tags')
     */
    protected $tags

    /**
     * @belongs_to('author')
     */
    protected $author;

    /**
     * @has_one('author')
     */
    protected $validator;


  }
