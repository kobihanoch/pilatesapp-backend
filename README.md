# 🧘‍♀️ PilatesApp Server-Side

Welcome to the **PilatesApp Server-Side**, the backend application for managing users, authentication, and Pilates group sessions. This project is part of a larger system being developed for a **real client**, a Pilates instructor, to help manage their business efficiently. The **frontend** for this project is also under active development to provide a seamless user experience.

---

## 🌟 Features

- **User Management**: Create, update, delete, and retrieve user profiles.
- **Authentication**: Secure login, logout, and token-based authentication with JWT.
- **Session Management**: Create, update, delete, and retrieve Pilates group sessions.
- **Role-Based Access Control**: Separate routes and permissions for users and admins.
- **Security Enhancements**:
  - Middleware for route protection and role-based access.
  - Secure handling of access and refresh tokens.
  - Token blacklisting for secure logout.
  - Password hashing with bcryptjs.
- **HTTPS Security**: Deployed on **Render**, ensuring all API requests are encrypted and secure.

---

## 📂 Project Structure

### 🔑 Key Files

- **`src/index.js`**: Entry point of the application. Configures middleware, connects to the database, and sets up routes.
- **`src/config/db.js`**: MongoDB connection configuration.
- **`src/controllers/`**: Contains logic for handling requests for authentication, users, and sessions.
- **`src/middlewares/authMiddleware.js`**: Middleware for protecting routes and enforcing role-based access.
- **`src/models/`**: Mongoose schemas for users, sessions, and blacklisted tokens.
- **`src/routes/`**: Defines API routes for authentication, users, and sessions.

---

## 🔒 Security Features

### Middleware

- **`authMiddleware.js`**: Protects routes by verifying JWT tokens and enforces role-based access control (e.g., admin-only routes).
- **Error Handling**: Ensures proper error responses for unauthorized or invalid requests.

### Authentication

- **Access Tokens**: Short-lived tokens used for authenticating API requests. Stored securely in HTTP-only cookies to prevent XSS attacks.
- **Refresh Tokens**: Long-lived tokens used to generate new access tokens. Stored securely and validated during token refresh operations.
- **Token Blacklisting**: Implements a blacklist for invalidated tokens to ensure secure logout and prevent reuse of compromised tokens.

### Password Security

- **Hashing**: User passwords are hashed using bcryptjs before being stored in the database, ensuring they are never stored in plain text.

### HTTPS Security

- **Render Deployment**: The server is deployed on **Render**, which provides HTTPS by default, ensuring all API requests are encrypted and secure.

### CORS

- Configured to allow secure cross-origin requests while restricting unauthorized domains.

---

## 📡 API Endpoints

### 🔑 Authentication Routes (`/api/auth`)

- `POST /login`: Log in a user and issue access and refresh tokens.
- `POST /logout`: Log out a user and blacklist the refresh token.
- `POST /refresh`: Generate a new access token using a valid refresh token.

### 👤 User Routes (`/api/users`)

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

### 🗓️ Session Routes (`/api/sessions`)

- **Admin**:
  - `POST /create`: Create a new session.
  - `GET /all`: Get all sessions.
  - `PUT /update/:id`: Update a session by ID.
  - `DELETE /delete/:id`: Delete a session by ID.
- **User**:
  - `GET /my`: Get all sessions the user is registered to.
  - `GET /soon`: Get all sessions for the year by selected date.
  - `GET /:id`: View details of a specific session.
  - `POST /register/:id`: Register for a session.
  - `POST /unregister/:id`: Unregister from a session.

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Variables**: dotenv
- **Password Hashing**: bcryptjs
- **CORS**: Configured for secure cross-origin requests
- **Deployment**: Render (with HTTPS)

---

## 🌐 Deployment

The server is deployed on **Render** and can be accessed via HTTPS. This ensures that all API requests are encrypted, providing an additional layer of security for users and administrators.

---

## 🖥️ Frontend

A dedicated frontend for this project is under active development and will provide a modern, user-friendly interface for instructors and clients.

**Frontend repository:**  
[https://github.com/kobihanoch/pilatesapp-frontend](https://github.com/kobihanoch/pilatesapp-frontend)

---

## 📧 Contact

For any questions or issues, feel free to reach out to the project maintainer.

**Email:** kobikobi622@gmail.com

---

### 🎉 Thank you for using PilatesApp Server-Side!
