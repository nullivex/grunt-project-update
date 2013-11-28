# grunt-project-update [![Build Status](https://travis-ci.org/snailjs/grunt-project-update.png?branch=master)](https://travis-ci.org/snailjs/grunt-project-update)

> Grunt task to update bower, npm, and other arbitrary update tasks

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-project-update --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-project-update');
```

## The "project_update" task

### Overview

To activate plugin please define a default config similar to this.

```js
grunt.initConfig({
  projectUpdate: {
    projectUpdate: {
      options: {
        commands: [
          {cmd: "npm", args: ["install"]},
          {cmd: "npm", args: ["update"]},
          {cmd: "npm", args: ["prune"]}
        ]
      }
    }
  }
})
```

### Options

#### commands
Type: `Array`
Default value: []

An array of commands to run in this format
```js
{cmd: "npm", args: ["prune"]}
```

or with the CWD (current working directory)
```js
{cmd: "npm", args: ["prune"], opts: {cwd: "/foo"}}
```

### Usage Examples

#### Default Options

By default it will not run any commands

Thus no initial config is needed.

#### Custom Options
If however you wanted to also do the same process with bower you could do this.

```js
grunt.initConfig({
  projectUpdate: {
    projectUpdate: {
      options: {
        commands: {[
          {cmd: "npm", args: ["install"]},
          {cmd: "npm", args: ["update"]},
          {cmd: "npm", args: ["prune"]},
          {cmd: "bower", args: ["install"]},
          {cmd: "bower", args: ["update"]},
          {cmd: "bower", args: ["prune"]}
        ]}
      }
    }
  }
})
```

If the working directory needed to be changing the config would look like this.

```js
var my_cwd = "/foo/bar"
grunt.initConfig({
  projectUpdate: {
    projectUpdate: {
      options: {
        commands: {[
          {cmd: "npm", args: ["install"], opts: {cwd: my_cwd}},
          {cmd: "npm", args: ["update"], opts: {cwd: my_cwd}},
          {cmd: "npm", args: ["prune"], opts: {cwd: my_cwd}},
          {cmd: "bower", args: ["install"], opts: {cwd: my_cwd}},
          {cmd: "bower", args: ["update"], opts: {cwd: my_cwd}},
          {cmd: "bower", args: ["prune"], opts: {cwd: my_cwd}}
        ]}
      }
    }
  }
})
```

## Contributing
Commits and changes are welcome.

Please follow the NPM coding style: https://npmjs.org/doc/coding-style.html

## Release History

### 0.1.0

Initial release and port from custom task right in the gruntfile
