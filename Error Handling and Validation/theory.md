# Error Handling and Validation in This Project

## How error handling works in Express 5

Express 5 makes error handling more straightforward than older versions. The main idea is:

1. A route, middleware, or controller can throw an error.
2. Express catches that error and forwards it to the next error-handling middleware.
3. An error middleware receives the error, decides how to respond, and sends a proper HTTP response.

In this project, the flow is:

- A request enters the app through the middleware chain.
- Validation middleware checks the incoming body.
- If validation fails, the request is stopped and an error is passed forward.
- If business logic fails, the controller throws a custom error.
- The error middleware formats the response and returns it to the client.

### Key Express 5 behavior

- Error middleware must have four arguments: `(err, req, res, next)`.
- You can throw errors directly inside routes and controllers.
- Express 5 also supports async/await errors more naturally, so rejected promises are passed to the error handler.
- A fallback route can throw a `404` error when no route matches.

## Structure of this project

This project is organized to separate concerns clearly:

- `src/app.js` sets up the Express app and global middleware.
- `src/routes/user.route.js` defines the route for user registration.
- `src/middlewares/validate.middlware.js` validates incoming request data.
- `src/schema/user.schema.js` defines the validation rules with Zod.
- `src/controllers/user.controller.js` contains the business logic.
- `src/errors/` contains custom error classes.
- `src/middlewares/error.middleware.js` handles all errors centrally.
- `src/util/response.js` formats successful responses.

## Validation flow

The validation flow starts when a request hits the registration route:

1. The route uses `registerValidate` before the controller.
2. The validation middleware runs the request body through the Zod schema.
3. If the data is valid, the request continues to the controller.
4. If the data is invalid, Zod throws a `ZodError`.
5. The global error middleware catches that error and returns a `400` response.

### Example

The schema in `src/schema/user.schema.js` ensures that:

- `name` is a non-empty string.
- `email` is a valid email.
- `password` is a string with length between 6 and 10 characters.

This means the API does not allow bad data to reach the business layer.

## Error handling flow

The project uses a custom error hierarchy to keep error responses consistent.

### Base error

`src/errors/AppError.js` is the base class for all application errors.

It stores:

- `message`
- `statusCode`
- `data`
- `isOperational`

### Specific error types

The project includes specialized error classes such as:

- `BadRequestError`
- `ConflictError`
- `ForbiddenError`
- `NotFoundError`
- `UnauthorizedError`

These classes make it easy to throw meaningful errors for different situations.

## How the central error middleware works

The file `src/middlewares/error.middleware.js` is the main error handler.

It works like this:

- If the error is an instance of `AppError`, it returns a structured JSON response with that status code.
- If the error is a `ZodError`, it returns a `400` response with validation details.
- For any other unexpected error, it returns a generic `500` response.

The response is also environment-aware:

- In development, extra details such as stack traces may be included.
- In production, the response is cleaner and safer.

## Example request lifecycle

For a registration request:

1. The client sends `POST /api/v1/user/register` with JSON data.
2. The validation middleware checks the body.
3. If the body is valid, the controller checks whether the user already exists.
4. If the email already exists, the controller throws a `ConflictError`.
5. The error middleware catches it and returns a JSON response like:

```json
{
  "success": false,
  "message": "User Already Exists"
}
```

## Why this structure is useful

This architecture is clean because it separates:

- request parsing
- validation
- business logic
- error definition
- error response formatting

That makes the application easier to maintain and easier to extend.

## Summary

This project demonstrates a modern Express 5-style approach to error handling and validation:

- validation is handled before business logic runs
- custom errors provide meaningful HTTP responses
- one central middleware handles all errors consistently
- the API returns predictable JSON responses

This is a strong foundation for building scalable backend applications.
