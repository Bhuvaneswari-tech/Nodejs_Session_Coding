function calculateBonus(salary, percentage) {
if (percentage < 0) throw new Error("Invalid bonus percentage");
return salary + salary * (percentage / 100);
}
module.exports = { calculateBonus };