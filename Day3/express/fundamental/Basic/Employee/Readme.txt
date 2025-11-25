Example 1 — Employee API with Logging + Authentication + Validation

Scenario
A company wants an Employee API that allows adding and fetching employee data. Requirements:
Log every request with timestamp and route
Authenticate requests with a simple token in headers
Validate employee data on creation (name and department required)
Handle errors globally
Cookie parsing and CORS handling include

CORS - Cross Origin Resource Sharing
uuid - universally unique identifier - 128 bit unique value used to identify
something in software systems

Purpose of uuid:
globally unique
No need for auto-increment ID - assign ID without asking database
Used for distributed systems - multiple servers or microservices

cookie parser
Cookie is a small piece of information stored in the browser

third-party middleware
Express dont have cookies

Login session
Remember me Login
shoping cart
Tracking

npm install express express-validator cors cookie-parser uuid

npm install --save-dev nodemon