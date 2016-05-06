//=== deliberate comments to trigger push/deploy on travis-ci
var request = require("request");
var assert = require('assert');
var base_url = "http://localhost:3000/"

describe("Hello World Test", function(){
  describe("GET /", function() {
       it("returns status code 200", function(done) {
           request.get(base_url, function(error, response, body) {

                       assert.equal(200, response.statusCode);
                       done();

          });
        });

        });

});
