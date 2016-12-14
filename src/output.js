var unparser = require('php-unparser');
var parser = require('php-parser');
var fs = require('fs');
var body = null;

var output = function(model) {
  this.model = model;
};

output.prototype.getBody = function() {
  if (body) {
    return Promise.resolve(body);
  } else {
    return new Promise(function(done, reject) {
      fs.readFile(__dirname + '/../template/model.php', function(err, data) {
        if (err) return reject(err);
        try {
          body = parser.parseCode(data.toString(), {
            parser: {
              extractDoc: true
            }
          });
          done(body);
        } catch(e) {
          reject(e);
        }
      })
    });
  }
};

output.prototype.render = function(filename, namespace) {
  var self = this;
  return new Promise(function(done, reject) {
    self.getBody().then(function(ast) {
      // @todo : change AST
      fs.writeFile(filename, '<?php\n' + unparser(ast), function(err) {
        if (err) {
          reject(err);
        } else {
          done();
        }
      });
    }).catch(reject); // silent errors
  });
};

module.exports = output;
