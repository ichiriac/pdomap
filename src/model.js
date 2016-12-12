var s = require("underscore.string");

/**
 * Initialize a model with a class
 */
var model = function(c) {

  var self = this;

  if (c.isAbstract) {
    throw new Error('Abstract class ' + c.name + ' can\'t be a model');
  }

  this.class = c;
  this.class.model = this;

  var head = c.doc.getAnnotation('model');

  // model name
  this.name = head.getArgument(0, 'name');
  if (this.name === null || s.trim(this.name).length === 0) {
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
  // console.log(c.properties);
  c.properties.forEach(function(p) {
    //console.log('>>', p);
    var col = p.doc && p.doc.getAnnotation('column');
    if (col) {
      var def = {
        name: p.name.substring(1),
        column: col.getArgument('name')
      };
      if (!def.column) {
        def.column = s.underscored(def.name);
      }
      var colType = col.getArgument(0, 'type');
      if (colType !== null) {
        def.type = colType;
      } else {
        def.type = 'string';
      }
      var isRequired = col.getArgument('required');
      if (isRequired !== null) {
        def.required = isRequired;
      }
      var size = col.getArgument(1, 'size');
      if (size !== null) {
        def.size = size;
      }
      var defValue = col.getArgument('default');
      if (defValue !== null) {
        def.default = defValue;
      }
      // check indexing
      if (p.doc.getAnnotation('unique') !== null) {
        def.unique = true;
      }
      if (p.doc.getAnnotation('index') !== null) {
        def.index = true;
      }
      if (p.doc.getAnnotation('search') !== null) {
        def.search = true;
      }
      self.columns.push(def);
    }
  });
};

model.prototype.checkExtends = function(models) {
  if (this.class.extends) {
    var ref = this.class.extends.get();
    if (!ref) {
      throw new Error('Unable to locate class ' + this.class.extends.name);
    }
    if (!ref.model) {
      throw new Error('Class ' + ref.name + ' is not a model');
    }

    // defaults
    this.extends = {
      'model': ref.model.name,
      'column': ref.model.extends ? ref.model.extends.column : 'type',
      'value': this.name
    };

    // annotation
    var extDoc = this.class.doc.getAnnotation('extends');
    if (extDoc !== null) {
      var colValue = extDoc.getArgument(0, 'type');
      var colName = extDoc.getArgument(1, ['column', 'property']);
      if (colValue !== null) {
        this.extends.value = colValue;
      }
      if (colName !== null) {
        this.extends.column = colName;
      }
    }

    if (!ref.model.extends) {
      // enable inheritance on parent
      ref.model.extends = {
        'model': false,  // this is the base class
        'column': this.extends.column,
        'value': ref.model.name
      }
    }
    // checking if the column name is coherent
    else if (ref.model.extends.column !== this.extends.column) {
      throw new Exception(
        'Bad column name, expecting ' + ref.model.extends.column
      );
    }

  } else {
    this.extends = false;
  }
}

module.exports = model;
