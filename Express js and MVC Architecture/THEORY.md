# Express.js

## What is Express.js?

Express.js is a lightweight and fast backend framework built on top of Node.js. It simplifies server-side development by providing routing, middleware support, request handling, response utilities, and many other features that would otherwise require manual implementation using Node's native HTTP module.

## Installation

Initialize a Node.js project:

```bash
npm init -y
```

Install Express:

```bash
npm install express
```

Basic Server:

```js
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

# Why Use Express Instead of Node's HTTP Module?

Using only Node.js:

```js
import http from "http";

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/users") {
    res.end("Users");
  }
});

server.listen(3000);
```

As applications grow, manually handling routes, request parsing, middleware, and error handling becomes difficult.

Express provides built-in solutions for these problems.

---

# Advantages of Express.js

## 1. Simplified Routing

Instead of manually checking URLs and HTTP methods:

```js
app.get("/users", controller);
app.post("/users", controller);
app.put("/users/:id", controller);
app.delete("/users/:id", controller);
```

---

## 2. Middleware Support

Middleware allows processing requests before they reach the final route handler.

Examples:

- Authentication
- Logging
- Validation
- Error Handling

```js
app.use((req, res, next) => {
  console.log(req.method);
  next();
});
```

---

## 3. Request Parsing

Express can automatically parse JSON request bodies.

```js
app.use(express.json());
```

Access data:

```js
req.body;
```

---

## 4. Cleaner Code Structure

Express encourages separation of concerns using MVC architecture.

```text
Routes
 ↓
Controllers
 ↓
Services
 ↓
Database
```

This makes applications easier to maintain and scale.

---

## 5. Better Response Methods

Express provides helper methods:

```js
res.send();
res.json();
res.status();
res.redirect();
```

Example:

```js
res.status(200).json({
  message: "Success",
});
```

---

## 6. Error Handling

Centralized error handling is easy.

```js
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
  });
});
```

---

## 7. Scalable Architecture

Express allows organizing projects into:

```text
src/
├── routes
├── controllers
├── services
├── middleware
├── models
└── app.js
```

This structure is commonly used in production applications.

---

# Request Lifecycle in Express

```text
Client Request
      ↓
Express Application
      ↓
Middleware
      ↓
Router
      ↓
Controller
      ↓
Service
      ↓
Database
      ↓
Response
```

Understanding this flow is important for backend development and interviews.

---

# Core Concepts to Learn

1. Express Application
2. Routing
3. Middleware
4. Request Object (req)
5. Response Object (res)
6. Route Parameters
7. Query Parameters
8. Request Body
9. MVC Architecture
10. Error Handling Middleware

---

# Summary

Express.js is a Node.js framework that reduces boilerplate code and provides powerful features such as routing, middleware, request parsing, response helpers, and scalable project structures. It helps developers build maintainable and production-ready backend applications much faster than using the native HTTP module alone.
