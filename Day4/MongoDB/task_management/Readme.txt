Case Study: Role-Based Task Management API
Project Goal

To create a simple API for managing tasks where users have 
different permissions based on their roles:

Admin: Can Create, Read, Update, and Delete any task.

User: Can only Read all tasks and Create new tasks.

Authentication : JWT token
Authorization: RBAC

 "bcryptjs": "^3.0.3",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^9.0.0",
    "morgan": "^1.10.1"


npm init -y

npm init express dotenv cors bcryptjs jsonwebtoken mongoose morgan

npm install --save-dev nodemon