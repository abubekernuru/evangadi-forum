
# API Documentation for Evangadi Forum

# Authentication Middleware

Endpoint: /api/user/checkUser
Method: GET
Description: Checks the current authenticated user's information.

Request Headers
● Authorization: Bearer token
Successful Response
Status Code: 200 OK

# Evangadi Forum — API Documentation

Base URL
```text
http://localhost:5500/api
```

Version: 1.0  •  Last updated: January 2024

## Table of contents
- [Authentication](#authentication)
- [Users](#users)
- [Questions](#questions)
- [Answers](#answers)
- [Error responses](#error-responses)
- [Common HTTP status codes](#common-http-status-codes)
- [Database schema reference](#database-schema-reference)



## Authentication

Most private endpoints require a JSON Web Token (JWT). Include it in the `Authorization` header as:

```text
Authorization: Bearer <your_jwt_token_here>
```

Tokens are issued by `POST /users/login` and expire after 24 hours.

### POST /users/register
Register a new user.

Access: Public

Request JSON body:

```json
{
  "username": "string (required, unique)",
  "first_name": "string (required)",
  "last_name": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required, min 8 characters)"
}
```

Success (201 Created):

```json
{
  "message": "User registered successfully",
  "user_id": 1
}
```

Errors:
- 400 Bad Request — missing or invalid fields
- 409 Conflict — username or email already exists

### POST /users/login
Authenticate user and receive a JWT.

Access: Public

Request JSON body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

Success (200 OK):

```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "john_doe",
    "first_name": "John"
  }
}
```

Errors:
- 401 Unauthorized — invalid credentials

### GET /users/check
Verify the current JWT and return basic user info.

Access: Private (requires authentication)

Headers:

```text
Authorization: Bearer <jwt_token>
```

Success (200 OK):

```json
{
  "isLoggedIn": true,
  "user": {
    "id": 1,
    "username": "john_doe",
    "first_name": "John",
    "email": "john@example.com"
  }
}
```

Errors:
- 401 Unauthorized — invalid or missing token



## Questions

### GET /question
Get all questions, ordered by newest first.

Access: Public

Success (200 OK):

```json
[
  {
    "id": 1,
    "title": "How to center a div in CSS?",
    "description": "I'm trying to center a div both horizontally and vertically...",
    "username": "john_doe",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
]
```

### GET /question/:question_id
Get a single question's details.

Path parameters:
- `question_id` (integer, required) — ID of the question

Access: Public

Success (200 OK):

```json
{
  "id": 1,
  "title": "How to center a div in CSS?",
  "description": "Full question description here...",
  "username": "john_doe",
  "created_at": "2024-01-15T10:30:00.000Z",
  "user_id": 1
}
```

Errors:
- 404 Not Found — question not found

### POST /question
Create a new question.

Access: Private (requires authentication)

Headers:

```text
Authorization: Bearer <jwt_token>
```

Request JSON body:

```json
{
  "title": "string (required, max 200 characters)",
  "description": "string (required)"
}
```

Success (201 Created):

```json
{
  "message": "Question created successfully",
  "question_id": 1
}
```

Errors:
- 400 Bad Request — validation error
- 401 Unauthorized — user not authenticated



## Answers

### GET /answer/:question_id
Get all answers for a specific question.

Path parameters:
- `question_id` (integer, required) — ID of the question

Access: Public

Success (200 OK):

```json
[
  {
    "id": 1,
    "answer": "You can use Flexbox to center the div...",
    "username": "css_expert",
    "created_at": "2024-01-15T11:00:00.000Z",
    "question_id": 1,
    "user_id": 2
  }
]
```

Errors:
- 404 Not Found — question not found

### POST /answer
Post an answer to a question.

Access: Private (requires authentication)

Headers:

```text
Authorization: Bearer <jwt_token>
```

Request JSON body:

```json
{
  "answer": "string (required)",
  "question_id": "integer (required)"
}
```

Success (201 Created):

```json
{
  "message": "Answer posted successfully",
  "answer_id": 1
}
```

Errors:
- 400 Bad Request — validation error
- 401 Unauthorized — user not authenticated
- 404 Not Found — question not found



## Error responses

All error responses follow this structure:

```json
{
  "error": "Error message describing what went wrong",
  "code": "ERROR_CODE",
  "details": "Additional error details if available"
}
```

Use the `code` field for machine-friendly error handling.

## Common HTTP status codes

- 200 OK — request successful
- 201 Created — resource created successfully
- 400 Bad Request — invalid request data
- 401 Unauthorized — authentication required or failed
- 404 Not Found — resource not found
- 409 Conflict — resource already exists
- 500 Internal Server Error — server error



## Example usage flow

1. Register a user

Request:

```http
POST /api/users/register
Content-Type: application/json

{
  "username": "student123",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@evangadi.com",
  "password": "securepassword123"
}
```

Response (201):

```json
{
  "message": "User registered successfully",
  "user_id": 5
}
```

2. Login to obtain token

Request:

```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@evangadi.com",
  "password": "securepassword123"
}
```

Response (200):

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 5,
    "username": "student123",
    "first_name": "John"
  }
}
```

3. Ask a question (authenticated)

Request:

```http
POST /api/question
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "How to use React hooks?",
  "description": "I'm confused about the useEffect hook..."
}
```

Response (201):

```json
{
  "message": "Question created successfully",
  "question_id": 10
}
```

4. Get questions

Request:

```http
GET /api/question
```

Response (200):

```json
[
  {
    "id": 10,
    "title": "How to use React hooks?",
    "description": "I'm confused about the useEffect hook...",
    "username": "student123",
    "created_at": "2024-01-15T12:00:00.000Z"
  }
]
```

5. Post an answer (authenticated)

Request:

```http
POST /api/answer
Authorization: Bearer <token>
Content-Type: application/json
```

Content-Type: application/json

{
  "answer": "The useEffect hook is used for side effects...",
  "question_id": 10
}
```

Response (201):

```json
{
  "message": "Answer posted successfully",
  "answer_id": 25
}
```



## Database schema reference

### Users table
- `id` — primary key, auto-increment
- `username` — unique username
- `first_name` — user's first name
- `last_name` — user's last name
- `email` — unique email address
- `password` — hashed password
- `created_at` — timestamp of creation

### Questions table
- `id` — primary key, auto-increment
- `title` — question title (max 200 chars)
- `description` — full question description
- `user_id` — foreign key to users table
- `created_at` — timestamp of creation

### Answers table
- `id` — primary key, auto-increment
- `answer` — answer text
- `question_id` — foreign key to questions table
- `user_id` — foreign key to users table
- `created_at` — timestamp of creation



Project: Evangadi Forum Q&A Platform