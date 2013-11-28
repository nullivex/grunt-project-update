/*
 * grunt-project-update
 * https://github.com/snailjs/grunt-project-update
 *
 * Copyright (c) 2013 Bryan Tong
 * Licensed under the LGPLv3 license.
 */

module.exports = function(grunt){
  grunt.registerMultiTask(
    "projectUpdate",
    "Grunt task to update bower, npm, and other arbitrary update tasks",
    function(){
      var done = this.async()
      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
        commands: []
      })

      require("async").eachSeries(
        options.commands,
        function(opts,fn){
          grunt.log.writeln("Executing " + opts.cmd + " " + opts.args.join(" "))
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
    }
  )
}
