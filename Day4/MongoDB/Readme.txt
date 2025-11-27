Case Study 3: Digital Library Management System (DLMS)
Project Overview
This backend manages digital books, authors, and library members.
Features:
Upload and stream eBooks/PDFs
Member management (borrow/return books)
Admin and Librarian roles
JWT authentication & role-based access
Caching of frequently accessed book lists
Profiling, testing, and deployment ready
Roles:
Admin: Manage books and librarians
Librarian: Upload books, manage borrow requests
Member: Borrow and read books
1️⃣ Features
Node.js & Express: Async operations, RESTful APIs
MongoDB + Mongoose: Schemas for books, authors, members, borrow records
JWT Authentication & RBAC
In-Memory Cache & Redis-ready for book lists
Streaming: EBooks/PDFs
Profiling: console.time() and Node.js inspector
Testing: Jest (unit) and Supertest (integration)
Deployment: Azure App Service


npm install express mongoose dotenv bcryptjs jsonwebtoken cors body-parser morgan node-cache winston
npm install --save-dev nodemon jest supertest
