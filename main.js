/*!
 * Copyright (C) 2017 Ioan CHIRIAC (BSD3 License)
 * @authors https://github.com/ichiriac/pdomap/graphs/contributors
 */
'use strict';

var reflection  = require('php-reflection');
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
    console.log('>> ' + directory);
    this.workspace = new reflection.Repository(directory, {
        forkWorker: false
    });
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
    return new Promise(function(done, reject) {

        self.log('step', 'Scan files');
        self.workspace.scan().then(function() {
            self.log('step', 'Reading classes');
            var classes = [];
            self.workspace.getByType('class').forEach(function(c) {
                if (!c.doc) return;
                var model = c.doc.getAnnotation('model');
                console.log(model);
                if (model !== null) {
                    classes.push(c);
                }
            });
            if (classes.length === 0) {
                return reject(
                    new Error(
                        'No mapping classes found into "' + self.workspace.directory + '"'
                    )
                );
            }

            // exports
            var models = {};
            self.progress = 0;
            try {
                classes.forEach(function(c, index) {
                    var progress = Math.round((index + 1) / classes.length * 100);
                    if (progress !== self.progress) {
                        self.log('progress', progress);
                        self.progress = progress;
                    }
                    // read meta
                    var m = new model(c);
                    models[m.name] = m;
                });
                for(var m in models) {
                    models[m].checkExtends(models);
                }
            } catch(e) {
                return reject(e);
            }


            // writing files
            self.log('step', 'Exporting the model');
            self.progress = 0;
            var index = 0;
            var wait = [];
            for(var m in models) {
                var out = new output(models[m]);
                // console.log(destination + '/' + out.model.name + '.php');
                wait.push(
                    out.render(destination + '/' + out.model.name + '.php', namespace).then(function() {
                        var progress = Math.round(++index / wait.length * 100);
                        if (progress !== self.progress) {
                            //self.log('progress', progress);
                            self.progress = progress;
                        }
                    })
                );
            }

            Promise.all(wait).then(function() {
                if (sync) {
                self.log('step', 'Synchronize the database');
                }
                done();
            }, reject);
        }, reject);
    });
};

/**
 * Logs some information (used by verbose mode)
 */
generator.prototype.log = function(mode, data) { };

module.exports = generator;
