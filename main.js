

var repository  = require('php-reflection');
var model       = require('./src/model');
var output      = require('./src/output');
var mysql       = require('mysql');

/**
 * The generator main class
 * @constructor generator
 * @property {repository} workspace
 */
var generator = function(directory) {
  var self = this;
  this.workspace = new repository(directory);
  // log the parsing progress
  this.workspace.on('progress', function(counter) {
    if (counter.total > 0) {
      var progress = Math.round(counter.loaded / counter.total * 100);
      if (progress !== self.progress) {
        self.log('progress', progress);
        self.progress = progress;
      }
    }
  });
};

/**
 * Connecting to the database
 */
generator.prototype.connect = function(host, port, user, password, database) {
  this.log('step', 'Connecting to ' + user + '@' + host);
  this.db = mysql.createConnection({
    host     : host,
    port     : port,
    user     : user,
    password : password,
    database : database
  });
  return new Promise(function(done, reject) {
    this.db.connect(function(err) {
      if (err) {
        reject(err);
        return;
      }
      done();
    });
  }.bind(this));
};


/**
 * Scan files and generates output to the specified path
 */
generator.prototype.generate = function(destination, namespace, sync) {
  var self = this;
  if (!destination) destination = this.workspace.directory;
  this.log('step', 'Scan data');
  this.workspace.scan().then(function() {
    self.log('step', 'Generating');
    var classes = [];
    self.workspace.getByType('class').forEach(function(c) {
      var model = c.doc.getAnnotation('model');
      if (model) {
        classes.push(c);
      }
    });
    // exports
    self.progress = 0;
    classes.forEach(function(c, index) {
      var progress = Math.round((index + 1) / classes.length * 100);
      if (progress !== self.progress) {
        self.log('progress', progress);
        self.progress = progress;
      }
      // output
    });
    // finish
    self.log('step', 'Done');
    process.exit(0);
  });
};

/**
 * Logs some information (used by verbose mode)
 */
generator.prototype.log = function(mode, data) { };

module.exports = generator;
