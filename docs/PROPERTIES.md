
```php
<?php
  /**
   * A post entry
   * @model(name = "post", table = "blog_posts")
   * @primary("post_id")
   * @search("ByText", ["title", "summary"])
   * @unique(["email", "avatar"])
   * @index([])
   */
  class Post {
    /**
     * @column(name => "post_tile", type => "text", size => 255)
     * @required
     * @var string
     */
    protected $title;

    /**
     * @column(name => "post_sumary", type => "text", size => 1024)
     * @var string
     */
    protected $summary;

    /**
     * @column(type => "text", size => 124)
     * @unique
     * @var string
     */
    protected $slug;

    /**
     * @column(name => 'author_id')
     * @belongs_to("author")
     * @var Author
     */
    protected $author;

    /**
     * @has_many("tag", through => "post_tags")
     * @var Tag[]
     */
    protected $tags;

    /**
     * Sets the page title
     */
    public function setTitle($title) {
      $this->title = $title;
      $this->slug = md5($title);
    }

    /** LIST OF HOOKS **/
    protected function beforeSave() { }
    protected function afterSave() { }
    protected function beforeDelete() { }
    protected function afterDelete() { }
  }

  /**
   * @model(name = 'videos')
   * @extends
   */
  class VideoPost extends Post {

  }
```
