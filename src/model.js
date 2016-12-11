var s = require("underscore.string");

/**
 * Initialize a model with a class
 */
var model = function(c) {

  var self = this;

  this.class = c;
  var head = c.doc.getAnnotation('model');

  // model name
  this.name = head.getArgument(0, 'name');
  if (!this.name) {
    this.name = c.name;
  }

  // table name
  this.table = head.getArgument(1, 'table');
  if (!this.table) {
    this.table = s.underscored(this.name);
    if (this.table.substring(-1) !== 's') {
      this.table += 's';
    }
  }

  // the primary key
  var pk = c.doc.getAnnotation('primary');
  if (pk) {
    var pkName = pk.getArgument(0, 'name');
    if (pkName) {
      this.primary = {
        'name': s.camelize(pkName),
        'column': pkName
      };
    }
    this.primary.type = pk.getArgument(1, 'type');
    if (!this.primary.type) {
      this.primary.type = 'integer';
    }
    this.primary.strategy = pk.getArgument(2, 'strategy');
    if (!this.primary.strategy) {
      if (this.primary.type === 'integer') {
        this.primary.strategy = 'auto';
      } else {
        this.primary.strategy = 'rand';
      }
    }
  }
  if (!this.primary) {
    this.primary = {
      'name': 'id',
      'column': s.underscored(this.name) + '_id',
      'type': 'integer',
      'strategy': 'auto'
    };
  }

  // indexes
  this.indexes = [];
  c.doc.getAnnotations('index').forEach(function(a) {
    var name = a.getArgument(0, 'name');
    var what = a.getArgument(1, ['properties', 'columns']);
    if (what && name) {
      if (!Array.isArray(what)) what = [what];
      self.indexes.push({
        type: 'index',
        name: name,
        properties: what
      });
    }
  });
  c.doc.getAnnotations('search').forEach(function(a) {
    var name = a.getArgument(0, 'name');
    var what = a.getArgument(1, ['properties', 'columns']);
    if (what && name) {
      if (!Array.isArray(what)) what = [what];
      self.indexes.push({
        type: 'search',
        name: name,
        properties: what
      });
    }
  });
  c.doc.getAnnotations('unique').forEach(function(a) {
    var what = a.getArgument(0, ['properties', 'columns']);
    if (what) {
      if (!Array.isArray(what)) what = [what];
      self.indexes.push({
        type: 'unique',
        properties: what
      });
    }
  });

  // scan columns
  this.columns = [];

};

module.exports = model;
