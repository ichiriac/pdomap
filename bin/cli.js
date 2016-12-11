var program = require('commander');
var pkg = require('../package.json');
var main = require('../main');

program
  .version(pkg.version)
  .description(pkg.description)
  .usage('[options] <path>')
  .option('-h, --host', 'Sets the mysql host', 'localhost')
  .option('-P, --port', 'Sets the mysql port', 3306)
  .option('-d, --database', 'Sets the database name', 'tests')
  .option('-u, --user', 'Sets the user name', 'root')
  .option('-p, --pwd', 'Sets the user password', '')
  .option('-n, --namespace', 'Sets classes namespace', '/')
  .option('-c, --core', 'Sets core class name', '/')
  .parse(process.argv);

// todo
