const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("function convertHandler.getNum(input)", function () {
    // #1
    test("Whole number input", function (done) {
      let input = "10gal";
      assert.equal(convertHandler.getNum(input), 10);
      done();
    });
    // #2
    test("decimal number input", function (done) {
      let input = "10.5gal";
      assert.equal(convertHandler.getNum(input), 10.5);
      done();
    });
    // #3
    test("fractional input", function (done) {
      let input = "10/5gal";
      assert.equal(convertHandler.getNum(input), 2);
      done();
    });
    // #4
    test("fractional input with decimal", function (done) {
      let input = "10/2.5gal";
      assert.equal(convertHandler.getNum(input), 4);
      done();
    });
    // #5
    test("an error on a double-fraction", function (done) {
      let input = "10/2.5/2gal";
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });
    // #6
    test("default to a numerical input of 1 when no numerical input is provided", function (done) {
      let input = "gal";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });
  suite("function convertHandler.getUnit(input)", function () {
    // #7
    test("each valid input unit", function (done) {
      let input = [
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "l",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      let output = [
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
      ];
      input.forEach(function (ele, index) {
        assert.equal(convertHandler.getUnit(ele), output[index]);
      });
      done();
    });
    // #8
    test("an error for an invalid input unit", function (done) {
      assert.equal(convertHandler.getUnit("kilograms"), undefined);
      done();
    });
  });
  suite("function convertHandler.getReturnUnit(input)", function () {
    // #9
    test("the correct return unit for each valid input unit", function (done) {
      let input = [
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "l",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      let output = [
        "L",
        "gal",
        "km",
        "mi",
        "kg",
        "lbs",
        "L",
        "gal",
        "km",
        "mi",
        "kg",
        "lbs",
      ];
      input.forEach(function (ele, index) {
        assert.equal(convertHandler.getReturnUnit(ele), output[index]);
      });
      done();
    });
    // #10
    test("correctly convert gal to L", function (done) {
      assert.equal(convertHandler.getReturnUnit("gal"), "L");
      done();
    });
    // #11
    test("correctly convert L to gal", function (done) {
      assert.equal(convertHandler.getReturnUnit("L"), "gal");
      done();
    });
    // #12
    test("correctly convert mi to km", function (done) {
      assert.equal(convertHandler.getReturnUnit("mi"), "km");
      done();
    });
    // #13
    test("correctly convert km to mi", function (done) {
      assert.equal(convertHandler.getReturnUnit("km"), "mi");
      done();
    });
    // #14
    test("correctly convert lbs to kg", function (done) {
      assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
      done();
    });
    // #15
    test("correctly convert kg to lbs", function (done) {
      assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
      done();
    });
  });
  suite("function convertHandler.spellOutUnit(input)", function () {
    // #9
    test("return the spelled-out string unit for each valid input unit", function (done) {
      let input = [
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "l",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      let output = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      input.forEach(function (ele, index) {
        assert.equal(convertHandler.spellOutUnit(ele), output[index]);
      });
      done();
    });
  });
});
