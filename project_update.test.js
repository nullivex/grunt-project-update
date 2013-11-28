require("should")
var grunt = require("grunt")
describe("Grunt Project Update",function(){
  it("should have a commands array in options",function(){
    grunt.config.data.projectUpdate.should.be.type("object")
    grunt.config.data.projectUpdate.projectUpdate.options.commands.should.be.type("object")
  })
})