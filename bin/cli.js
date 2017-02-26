#!/usr/bin/node
/*!
 * Copyright (C) 2017 Ioan CHIRIAC (BSD3 License)
 * @authors https://github.com/ichiriac/pdomap/graphs/contributors
 */

var program     = require('commander');
var pkg         = require('../package.json');
var fs          = require('fs');
var defaults    = {
    host: 'localhost',
    port: 3306,
    database: 'tests',
    user: 'root',
    password: false,
    namespace: '',
    core: 'pdomap'
};

// reading the configuration file
var configFile = process.cwd() + '/.pdomap.json';

if (fs.existsSync(configFile)) {
    try {
        var config = JSON.parse(
            fs.readFileSync(configFile).toString()
        );
    } catch(e) {
        console.log(e);
        process.exit(1);
    }
    for(var k in config) {
        defaults[k] = config[k];
    }
}

// defines the cli API
program
    .version(pkg.version)
    .description(pkg.description)
    .usage('[options] <source> <destination>')
    .option('-h, --host [name]', 'Sets the mysql host', defaults.host)
    .option('-P, --port [port]', 'Sets the mysql port', defaults.port)
    .option('-d, --database [name]', 'Sets the database name', defaults.database)
    .option('-u, --user <user>', 'Sets the user name', defaults.user)
    .option('-p, --pwd  <pwd>', 'Sets the user password', defaults.password)
    .option('-n, --namespace  <name>', 'Sets classes namespace', defaults.namespace)
    .option('-c, --core  <class>', 'Sets core class name', defaults.core)
    .parse(process.argv);

// defines the scan path
if (defaults.path) {
    program.args[0] = defaults.path;
}

// define the output path
if (defaults.output) {
    program.args[1] = defaults.output;
}

// check arguments
if (program.args.length < 1 || program.args.length > 2) {
    console.error('Expecting the path argument');
    process.exit(1);
}

var progress    = require('progress');
var colors      = require('colors/safe');
var readline    = require('readline');

var generator   = require('../main');
var main = new generator(program.args[0]);

// handle output
var bar = null;
var lastStep = null;
main.log = function(mode, data) {
    if (mode === 'step') {
        if (bar) {
            bar.terminate();
            bar = null;
        }
        if (lastStep) {
            readline.moveCursor(process.stdout, 0, -2);
            readline.clearLine(process.stdout, 0)
            process.stdout.clearLine();
            var line = '> ' + lastStep;
            for(i = line.length; i < 48; i++) line += ' ';
            console.log(line + '['+colors.green('done')+']');
        }
        console.log('> ' + data + ' ...\n');
        lastStep = data;
    } else if (mode === 'progress') {
        if (!bar) {
            bar = new progress('  ╢:bar╟  :percent :etas', {
                total: 100,
                width: 40,
                complete: colors.cyan('█'),
                incomplete: '░',
                clear: true
            });
        }
        bar.tick(data);
    }
};

function startProcess() {
    main.connect(program.host, program.port, program.user, program.pwd, program.database).then(function() {
        main.generate(
            program.args.length === 2 ? program.args[1] : null,
            program.namespace,
            true
        ).then(function() {
            // finish
            main.log('step', 'Done');
            process.exit(0);
        }, function(e) {
            console.error(e.stack);
            process.exit(1);
        });
    }, function(e) {
        console.error(e.stack);
        process.exit(1);
    });
}

if (program.pwd === false) {
    var read = require('read');
    read({
        prompt: colors.yellow(program.user + '@' + program.host) + ' password ?',
        silent: true,
        replace: '*',
        timeout: 30000
    }, function(err, pwd) {
        if (err) {
            console.error("\n" + colors.red(err) + "\n");
            process.exit(1);
            return;
        }
        program.pwd = pwd;
        startProcess();
    });
} else {
    startProcess();
}
