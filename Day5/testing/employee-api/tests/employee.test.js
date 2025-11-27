const request = require("supertest");
const app = require("../app");
describe("Employee API", () => {
test("GET /employees should return all employees", async ()=> {
const res = await request(app).get("/employees");
expect(res.statusCode).toBe(200);
expect(res.body.length).toBeGreaterThan(0);
});
test("POST /employees should add a new employee", async ()=> {
const res = await request(app)
.post("/employees")
.send({ name: "Charlie", salary: 70000 });
expect(res.statusCode).toBe(200);
expect(res.body.name).toBe("Charlie");
});
});