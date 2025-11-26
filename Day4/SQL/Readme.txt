1. Project Description : ELM
You are building an Employee Leave Management API that supports:
Features
1. Add Employee
2. Apply for Leave
3. Manager approves/rejects leave
4. Search employee leaves by query params
5. Custom logger for every API call
6. Authentication using JWT
7. Sequelize ORM for DB operations
8. Transaction handling during leave approval

A company wants to build a simple backend for employees to apply for leave 
and for managers to view, approve, or reject leaves.You must build REST 
APIs using:
Express.js
Router-level & global middleware
Custom logger
Token validation middleware
Sequelize ORM - Object RElational Model
MySQL database
Routes with params & query strings
Transactions for approval/rejection
Error handling middleware

| Package          | Purpose                         |
| ---------------- | ------------------------------- |
|   express        | API framework                   |
|   sequelize      | ORM to interact with MySQL      |
|   mysql2         | MySQL connector                 |
|   dotenv         | Load env variables              |
|   cors           | Enable CORS                     |
|   helmet         | Security headers                |
|   jsonwebtoken   | Token-based auth                |
|   bcryptjs       | Password hashing                |
|   winston        | Logger for middleware           |
|   nodemon        | Auto-restart during development |
 

npm init -y

npm install express sequelize mysql2 dotenv cors helmet jsonwebtoken 
bcryptjs winston nodemon

npm install --save-dev nodemon

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbmFnZXIiLCJyb2xlIjoibWFuYWdlciIsImlhdCI6MTc2NDE1NTgzOSwiZXhwIjoxNzY0MTU5NDM5fQ.kSP8wUAD61USbJdvVJ5A63_9TC31xDDjsZy0EwpC4Nk"
}