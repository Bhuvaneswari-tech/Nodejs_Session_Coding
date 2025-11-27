const { calculateBonus } = require("../utils/salary");
describe("calculateBonus", () => {
test("should calculate 10% bonus correctly", () => {
expect(calculateBonus(1000, 10)).toBe(1100);
});
test("should throw error for negative percentage", () => {
expect(() => calculateBonus(1000, -5)).toThrow("Invalid bonus percentage");
});
});