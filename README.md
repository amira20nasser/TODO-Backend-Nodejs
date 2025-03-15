# TODO-Backend-Nodejs
# Todo API with Authentication

A RESTful API for managing todos with user authentication built using Node.js, Express, and MongoDB.

## Features

- User authentication (signup, signin, signout)
- JWT-based authorization with secure HTTP-only cookies
- Todo management (create, update status, delete, get by ID)
- User-specific todo lists with filtered views (all todos, remaining todos)
- Password encryption with bcrypt
- MongoDB database integration

## Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local instance or connection string)
- npm or yarn

## Installation
Create a `.env` file in the root directory with the following variables
```
PORT=3000
JWT_SECRET=[put your secret key]
MONGODB_URI=mongodb://localhost:27017/Todo
```

## Usage
### API Endpoints
#### Authentication Routes

- **POST /signup** - Register a new user
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

- **POST /signin** - Login user and return a token
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- **POST /signout** - Logout user

#### Todo Routes

- **POST /add-todo** - Add a new todo
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "Boolean"
  }
  ```

- **PUT /change-status/:id** - Change the status of a todo

- **DELETE /delete-todo/:id** - Delete a specific todo

- **GET /getById/:id** - Retrieve a specific todo by its ID

#### User Routes

- **GET /get-todos** - Retrieve all todos for the authenticated user

- **GET /get-remain-todo** - Retrieve only the incomplete todos for the authenticated user

## Authentication

All todo routes are protected and require authentication. To access these routes:

1. First sign in using the `/signin` endpoint
2. The API will set a cookie named `token` with the JWT
3. All subsequent requests will use this cookie for authentication

## Data Models

### User

```javascript
{
  username: String,
  email: String,
  password: String (hashed)
}
```

### Todo

```javascript
{
  title: String,
  description: String,
  status: Boolean,
  userId: ObjectId
}
```

## Security

- Passwords are hashed using bcrypt before storage
- Authentication uses JWT stored in HTTP-only cookies
- Route protection ensures users can only access their own data
