const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server =
  "https://boilerplate-project-metricimpconverter-1.kaheng-lei.repl.co";

chai.use(chaiHttp);

suite("Functional Tests", function () {
  // #1
  test("Test GET /convert a valid input", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end(function (err, res) {
        assert.equal(res.status, 200, "response status should be 200");
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.equal(res.body.returnNum, 2.64172);
        assert.equal(res.body.returnUnit, "gal");
        assert.equal(res.body.string, "10 liters converts to 2.64172 gallons");
        done();
      });
  });
  // #2
  test("Test GET /convert an invalid input", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        assert.equal(res.status, 200, "response status should be 200");
        assert.equal(res.body.initUnit, undefined);
        done();
      });
  });
  // #3
  test("Test GET /convert an invalid number", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (err, res) {
        assert.equal(res.status, 200, "response status should be 200");
        assert.equal(res.body.initNum, undefined);
        done();
      });
  });
  // #4
  test("Test GET /Convert an invalid number AND unit", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end(function (err, res) {
        assert.equal(res.status, 200, "response status should be 200");
        assert.equal(res.body.initNum, undefined);
        assert.equal(res.body.initUnit, undefined);
        done();
      });
  });
  // #5
  test("Test GET /Convert an invalid number AND unit", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end(function (err, res) {
        assert.equal(res.status, 200, "response status should be 200");
        assert.equal(res.type, "application/json", "response should be json");
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        assert.equal(res.body.returnNum, 2.20462);
        assert.equal(res.body.returnUnit, "lbs");
        assert.equal(res.body.string, "1 kilograms converts to 2.20462 pounds");
        done();
      });
  });
});
