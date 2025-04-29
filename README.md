# PilatesApp Server-Side

This is the server-side application for the PilatesApp, a platform for managing users, authentication, and Pilates group sessions. It is built using Node.js, Express, and MongoDB.

## Features

- **User Management**: Create, update, delete, and retrieve user profiles.
- **Authentication**: Secure login, logout, and token-based authentication with JWT.
- **Session Management**: Create, update, delete, and retrieve Pilates group sessions.
- **Role-Based Access Control**: Separate routes and permissions for users and admins.
- **Security Enhancements**:
  - Middleware for route protection and role-based access.
  - Secure handling of access and refresh tokens.
  - Token blacklisting for secure logout.
  - Password hashing with bcryptjs.

## Project Structure

```
src/
  index.js
  config/
    db.js
  controllers/
    authController.js
    sessionController.js
    userController.js
  middlewares/
    authMiddleware.js
  models/
    blacklistedTokenModel.js
    sessionModel.js
    userModel.js
  routes/
    authRoutes.js
    sessionRoutes.js
    userRoutes.js
```

### Key Files

- **`src/index.js`**: Entry point of the application. Configures middleware, connects to the database, and sets up routes.
- **`src/config/db.js`**: MongoDB connection configuration.
- **`src/controllers/`**: Contains logic for handling requests for authentication, users, and sessions.
- **`src/middlewares/authMiddleware.js`**: Middleware for protecting routes and enforcing role-based access.
- **`src/models/`**: Mongoose schemas for users, sessions, and blacklisted tokens.
- **`src/routes/`**: Defines API routes for authentication, users, and sessions.

## Security Features

### Middleware

- **`authMiddleware.js`**: Protects routes by verifying JWT tokens and enforces role-based access control (e.g., admin-only routes).
- **Error Handling**: Ensures proper error responses for unauthorized or invalid requests.

### Authentication

- **Access Tokens**: Short-lived tokens used for authenticating API requests. Stored securely in HTTP-only cookies to prevent XSS attacks.
- **Refresh Tokens**: Long-lived tokens used to generate new access tokens. Stored securely and validated during token refresh operations.
- **Token Blacklisting**: Implements a blacklist for invalidated tokens to ensure secure logout and prevent reuse of compromised tokens.

### Password Security

- **Hashing**: User passwords are hashed using bcryptjs before being stored in the database, ensuring they are never stored in plain text.

### CORS

- Configured to allow secure cross-origin requests while restricting unauthorized domains.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/pilatesapp_serverside.git
   cd pilatesapp_serverside
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /login`: Log in a user and issue access and refresh tokens.
- `POST /logout`: Log out a user and blacklist the refresh token.
- `POST /refresh`: Generate a new access token using a valid refresh token.

### User Routes (`/api/users`)

- **Public**:
  - `POST /create`: Register a new user.
- **User**:
  - `GET /get`: Get the authenticated user's profile.
  - `PUT /update`: Update the authenticated user's profile.
- **Admin**:
  - `GET /all`: Get all users.
  - `GET /:id`: Get a specific user by ID.
  - `PUT /update/:id`: Update a specific user by ID.
  - `DELETE /delete/:id`: Delete a specific user by ID.

### Session Routes (`/api/sessions`)

- **Admin**:
  - `POST /create`: Create a new session.
  - `GET /all`: Get all sessions.
  - `PUT /update/:id`: Update a session by ID.
  - `DELETE /delete/:id`: Delete a session by ID.
- **User**:
  - `GET /my`: Get all sessions the user is registered to.
  - `GET /:id`: View details of a specific session.
  - `POST /register/:id`: Register for a session.
  - `POST /unregister/:id`: Unregister from a session.

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Variables**: dotenv
- **Password Hashing**: bcryptjs
- **CORS**: Configured for secure cross-origin requests

## Running in Development

To run the project in development mode, use the following command:

```bash
npm start
```

## License

This project is licensed under the ISC License.
