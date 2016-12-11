var repository = require('repository');
var model = require('./src/model');
var output = require('./src/output');

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
 * Scan files and generates output to the specified path
 */
generator.prototype.generate = function(destination, namespace) {
  var self = this;
  if (!destination) destination = this.workspace.directory;
  this.log('step', 'Start to scan data');
  this.workspace.scan().then(function() {
    this.log('step', 'Start to generate');
    var classes = workspace.getByType('class');
  });
};

/**
 * Logs some information (used by verbose mode)
 */
generator.prototype.log = function(mode, data) { };

module.exports = generator;
