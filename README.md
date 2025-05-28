# PilatesApp Backend 🧘‍♂️💻

A robust, scalable backend for managing Pilates sessions, users, and authentication. Built with Node.js and Express, this project is designed for production-ready deployments in real Pilates studio applications, as part of a full-stack system.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Session Management Endpoints](#session-management-endpoints)
  - [User Management Endpoints](#user-management-endpoints)
- [Frontend Application](#frontend-application)
- [Contribution](#contribution)
- [Responsible Use](#responsible-use)
- [License](#license)
- [Contact](#contact)

---

## Features ✨

- User authentication and session management (JWT-based)
- Role-based authorization (admin, user)
- Full CRUD for users and Pilates sessions
- Secure API endpoints with middleware protection
- Pagination, filtering, and user-specific data access
- Designed for integration with a real Pilates studio frontend

---

## Tech Stack 🛠️

- **Node.js**
- **Express.js**
- **JWT Authentication**
- **Middleware-based security**
- **Modular MVC structure**

---

## Installation 🚀

```bash
git clone https://github.com/kobihanoch/pilatesapp-backend.git
cd pilatesapp-backend
npm install
```

> **Note:** Environment variables are required for proper operation (database, JWT secrets, etc). _These details are intentionally omitted from this README for security and best practices._

---

## Running the Project 🏃

```bash
npm start
```

---

## API Documentation

### Authentication Endpoints 🔐

| Method | Path                  | Description                    |
| ------ | --------------------- | ------------------------------ |
| POST   | `/api/auth/login`     | Log in a user                  |
| POST   | `/api/auth/logout`    | Log out a user                 |
| GET    | `/api/auth/checkauth` | Check if user is authenticated |
| POST   | `/api/auth/refresh`   | Refresh authentication token   |

---

### Session Management Endpoints 🗓️

#### Admin

| Method | Path                       | Description                  |
| ------ | -------------------------- | ---------------------------- |
| POST   | `/api/sessions/create`     | Create a new session         |
| GET    | `/api/sessions/all`        | Get all sessions (paginated) |
| PUT    | `/api/sessions/update/:id` | Update a session by ID       |
| DELETE | `/api/sessions/delete/:id` | Delete a session by ID       |

#### User

| Method | Path                           | Description                                   |
| ------ | ------------------------------ | --------------------------------------------- |
| GET    | `/api/sessions/my`             | Get all sessions the user is registered to    |
| GET    | `/api/sessions/soon`           | Get all sessions for current year from a date |
| GET    | `/api/sessions/:id`            | Get details of a specific session             |
| POST   | `/api/sessions/register/:id`   | Register to a session                         |
| POST   | `/api/sessions/unregister/:id` | Unregister from a session                     |

---

### User Management Endpoints 👤

#### Public

| Method | Path                | Description         |
| ------ | ------------------- | ------------------- |
| POST   | `/api/users/create` | Register a new user |

#### User (Authenticated)

| Method | Path                | Description             |
| ------ | ------------------- | ----------------------- |
| GET    | `/api/users/get`    | Get own user profile    |
| PUT    | `/api/users/update` | Update own user profile |

#### Admin

| Method | Path                    | Description               |
| ------ | ----------------------- | ------------------------- |
| GET    | `/api/users/all`        | Get all users             |
| GET    | `/api/users/:id`        | Get a specific user by ID |
| PUT    | `/api/users/update/:id` | Update a user by ID       |
| DELETE | `/api/users/delete/:id` | Delete a user by ID       |

---

## Frontend Application 🌐

A modern frontend for this project is under development.  
You can find the frontend repository here:  
[https://github.com/kobihanoch/pilatesapp-frontend](https://github.com/kobihanoch/pilatesapp-frontend)

---

## Contribution 🤝

Contributions are welcome following standard GitHub pull request workflows. Please open an issue to discuss major changes before submitting a PR.

---

## Responsible Use ⚠️

> **Warning:**  
> This code is provided for educational and development purposes only. Misuse, unauthorized deployment, or use in violation of applicable laws and regulations is strictly prohibited.  
> **Do not share, expose, or use the code for malicious or unethical purposes.**

---

## License 📝

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact 📧

For inquiries, suggestions, or partnership opportunities, please contact:  
**Kobi Hanoch**  
✉️ kobikobi622@gmail.com
