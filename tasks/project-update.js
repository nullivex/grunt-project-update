/*
 * grunt-project-update
 * https://github.com/snailjs/grunt-project-update
 *
 * Copyright (c) 2013 Bryan Tong
 * Licensed under the LGPLv3 license.
 */
var fs = require('fs')
  , path = require('path')

module.exports = exports = function(grunt){
  grunt.registerMultiTask(
    'projectUpdate',
    'Grunt task to update bower, npm, and other arbitrary update tasks',
    function(){
      var that = this
        , done = that.async()
        , commands = this.data.commands || []
        , cwd = this.data.cwd || null
      /**
       * Manager Definitions
       * @type {{packageManager: {enabled: boolean, file: string, commands: Array}}
       */
      var managers = {
        npm: {
          enabled: false,
          file: 'package.json',
          commands: [
            {cmd: 'npm', args: ['install'], cwd: cwd},
            {cmd: 'npm', args: ['update'], cwd: cwd},
            {cmd: 'npm', args: ['prune'], cwd: cwd}
          ]
        },
        bower: {
          enabled: false,
          file: 'bower.json',
          commands: [
            {cmd: 'bower', args: ['install'], cwd: cwd},
            {cmd: 'bower', args: ['update'], cwd: cwd},
            {cmd: 'bower', args: ['prune'], cwd: cwd}
          ]
        }
      }
      //enable detected managers
      Object.keys(managers).forEach(function(key){
        var manager = managers[key]
        if(fs.existsSync(manager.file)){
          manager.enabled = true
        } else if(true === that.data[key]){
          manager.enabled = true
        }
      })
      //setup commands to run
      Object.keys(managers).forEach(function(key){
        var manager = managers[key]
        if(manager.enabled){
          manager.commands.forEach(function(cmd){
            commands.push(cmd)
          })
        }
      })
      //cache current working dir
      var _cwd = process.cwd()
      //run the queued commands
      require('async').eachSeries(
        commands,
        function(opts,fn){
          if(opts.cwd && fs.existsSync(path.resolve(opts.cwd))){
            process.chdir(path.resolve(opts.cwd))
          }
          grunt.log.writeln('Executing ' + opts.cmd + ' ' + opts.args.join(' '))
          grunt.util.spawn(opts,function(err,res){
            if(err) fn(err)
            else {
              if(res.stderr) grunt.log.ok(res.stderr)
              if(res.stdout) grunt.log.ok(res.stdout)
              fn()
            }
          })
        },
        function(err){
          if(err) throw err
          done()
        }
      )
      //restore working dir
      process.chdir(_cwd)
    }
  )
}
