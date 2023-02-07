function checkDiv(input) {
  let nums = input.split("/");
  if (nums.length > 2) {
    return false;
  }
  return nums;
}

function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g);

  return [number[0], string[0]];
}

function ConvertHandler() {
  this.getNum = function (input) {
    let result = numberStringSplitter(input)[0];
    let nums = checkDiv(result);

    if (!checkDiv(result)) {
      return undefined;
    }

    let num1 = nums[0];
    let num2 = nums[1] || "1";

    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }
    return parseFloat(num1) / parseFloat(num2);
  };

  this.getUnit = function (input) {
    let result = numberStringSplitter(input)[1];
    switch (result.toLowerCase()) {
      case "gal":
        return "gal";
        break;
      case "l":
        return "L";
        break;
      case "km":
        return "km";
        break;
      case "mi":
        return "mi";
        break;
      case "kg":
        return "kg";
        break;
      case "lbs":
        return "lbs";
        break;
    }
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit.toLowerCase()) {
      case "gal":
        return "L";
        break;
      case "l":
        return "gal";
        break;
      case "km":
        return "mi";
        break;
      case "mi":
        return "km";
        break;
      case "kg":
        return "lbs";
        break;
      case "lbs":
        return "kg";
        break;
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit.toLowerCase()) {
      case "gal":
        return "gallons";
        break;
      case "l":
        return "liters";
        break;
      case "km":
        return "kilometers";
        break;
      case "mi":
        return "miles";
        break;
      case "kg":
        return "kilograms";
        break;
      case "lbs":
        return "pounds";
        break;
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit.toLowerCase()) {
      case "gal":
        return parseFloat((initNum * galToL).toFixed(5));
        break;
      case "l":
        return parseFloat((initNum / galToL).toFixed(5));
        break;
      case "km":
        return parseFloat((initNum / miToKm).toFixed(5));
        break;
      case "mi":
        return parseFloat((initNum * miToKm).toFixed(5));
        break;
      case "kg":
        return parseFloat((initNum / lbsToKg).toFixed(5));
        break;
      case "lbs":
        return parseFloat((initNum * lbsToKg).toFixed(5));
        break;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let initUnitString = this.spellOutUnit(initUnit);
    let returnUnitString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };
}

module.exports = ConvertHandler;
