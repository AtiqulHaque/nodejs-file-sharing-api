const math = {};
// math.add = (num1, num2) => num1 + num2;
math.add = async (num1, num2) => await num1 + num2;
// math.multiply = (num1, num2) => num1 * num2;
math.multiply = (num1, num2) => new Promise((resolve, reject) => {
    resolve(num1 * num2);
});
module.exports = math;