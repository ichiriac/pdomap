# pdoMap

A simple, powerfull, fast and lightweigt ORM written in PHP, and using the PDO
library as a DBAL layer.

![preview](https://raw.githubusercontent.com/ichiriac/pdoMap/master/docs/demo.gif)

I write this library because actually if I want a framework independ ORM
library that have a lightweight core framework. Size matters because I
would like to distribute my code under a small phar file (or php
concatenated files).

I have the choice between bellow these mainstream solutions :

- Propel : not lightweight
- Doctrine : not lightweight (worse than Propel)
- RedBean : really what I needed, but don't like the lack of configuration
(and it's end of life is already communicated)

## The perfect solution for me would be

- The same solution as Propel (everything can be configured)
- The same annotation system as Doctrine
- The size and simplicity of RedBean

## The proposal of pdoMap

- It's based on the same annotation system as Ruby Active Records
- It's generating class like propel
- It's based on a core-less generated code

## How to achieve this

__STANDALONE__

pdoMap is a NodeJS library that's just generate standalone class files -
the solution itself it's just a build engine and does not need to be
included into the distributed files

__TOOLING__

pdoMap can be installed with npm and used with grunt to automate the
generation process and keep the database synced

# Install in 1 minute

You need [nodejs & npm installed](https://nodejs.org/en/download/package-manager/).

From the console :

```sh
$ npm install -g pdomap
```

Go to your directory root and type :

```sh
$ mkdir model
$ pdomap ./src ./model
```

It will scan all the src directory, and output generated
classes into the model folder.

---

You may also automate your build process, take a look at the [pdoMap grunt plugin](https://github.com/ichiriac/grunt-contrib-pdomap)

# Options

```sh
$ pdomap --help

Usage: cli [options] <source> <destination>

Simple, powerfull, fast and lightweigt ORM written for PHP

Options:

  -h, --help               output usage information
  -V, --version            output the version number
  -h, --host [name]        Sets the mysql host
  -P, --port [port]        Sets the mysql port
  -d, --database [name]    Sets the database name
  -u, --user <user>        Sets the user name
  -p, --pwd  <pwd>         Sets the user password
  -n, --namespace  <name>  Sets classes namespace
  -c, --core  <class>      Sets core class name

```

# Documentation

To start creating you first model take a look at the [documentation](docs/MODEL.md).
