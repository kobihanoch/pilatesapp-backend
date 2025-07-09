# PilatesApp Backend 🧘‍♂️💻

A robust, scalable backend for managing Pilates sessions, users, and authentication. Built with Node.js and Express, this project is designed for production-ready deployments in real Pilates studio applications, as part of a full-stack system.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Installation](#-installation)
- [🏃‍♂️ Running the Project](#-running-the-project)
- [📬 Background Email Worker](#-background-email-worker)
- [📚 API Documentation](#-api-documentation)
  - [🔐 Authentication Endpoints](#-authentication-endpoints)
  - [👤 User Management Endpoints](#-user-management-endpoints)
  - [🧘 Session Management Endpoints](#-session-management-endpoints)
- [📁 Project Structure](#-project-structure)
- [🖥️ Frontend](#-frontend)
- [📄 License](#-license)
- [📫 Contact](#-contact)

---

## ✨ Features

- User authentication and session management (JWT-based)
- Role-based authorization (admin, user)
- Rest API
- Full CRUD for users and Pilates sessions
- Secure API endpoints with middleware protection
- Pagination, filtering, and user-specific data access
- Background Email Worker with Bull and Redis
- Docker Compose setup for running both the server and background workers – scalable and easy to deploy.
- Using rate limiting for protection against brute force and abuse
- Centralized error handling with async middleware
- Built-in refresh token support for seamless authentication flow
- Clean project architecture with MVC pattern (routes/controllers/services/models)
- Production-ready environment with `.env` configuration
- Scalable message queue setup ready for additional job types (e.g. cron jobs for session reminders)
- Modular and testable components (e.g. auth logic, role middleware, email producer)

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Queue**: Redis + Bull
- **Mailer**: Resend
- **Auth**: JWT, refresh tokens
- **Deployment**: Docker / Render

---

## 🚀 Installation

```bash
git clone https://github.com/kobihanoch/pilatesapp-backend.git
cd pilatesapp-backend
npm install
```

Create a `.env` file in the root with the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_USERNAME=default
REDIS_PASSWORD=your_redis_password
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
RESEND_API_KEY=your_resend_key
```

---

## 🏃‍♂️ Running the Project

### 🐳 Using Docker Compose

```bash
docker compose up --build
```

---

## 📬 Background Email Worker

Handles queued email jobs using Bull and Redis. Skips expired jobs based on `expiresAt` timestamp. (If the worker is not up)

Jobs are added by the producer (emailProducer.js) and processed in the background using a dedicated worker (emailWorker.js), improving performance and scalability for transactional notifications (e.g. session cancellation).

---

## 📚 API Documentation

### 🔐 Authentication Endpoints

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| POST   | `/api/auth/login`     | Log in a user            |
| POST   | `/api/auth/logout`    | Log out the current user |
| GET    | `/api/auth/checkauth` | Check if token is valid  |
| POST   | `/api/auth/refresh`   | Refresh token            |

### 👤 User Management Endpoints

| Method | Endpoint                | Description                       |
| ------ | ----------------------- | --------------------------------- |
| POST   | `/api/users/create`     | Public - Register a new user      |
| GET    | `/api/users/get`        | Auth - Get own profile            |
| PUT    | `/api/users/update`     | Auth - Update own profile         |
| GET    | `/api/users/all`        | Admin - Get all users (paginated) |
| GET    | `/api/users/:id`        | Admin - Get user by ID            |
| PUT    | `/api/users/update/:id` | Admin - Update user by ID         |
| DELETE | `/api/users/delete/:id` | Admin - Delete user by ID         |

### 🧘 Session Management Endpoints

| Method | Endpoint                                      | Description                            |
| ------ | --------------------------------------------- | -------------------------------------- |
| POST   | `/api/sessions/create`                        | Admin - Create a new session           |
| GET    | `/api/sessions/all`                           | Admin - Get all sessions (paginated)   |
| PUT    | `/api/sessions/update/:id`                    | Admin - Update a session by ID         |
| DELETE | `/api/sessions/delete/:id`                    | Admin - Delete a session by ID         |
| PUT    | `/api/sessions/cancel/:id`                    | Admin - Cancel a session by ID         |
| POST   | `/api/sessions/register/:sessionId/:username` | Admin - Register a user to a session   |
| POST   | `/api/sessions/unregister/:sessionId/:userId` | Admin - Unregister a user from session |
| GET    | `/api/sessions/myupcoming`                    | User - View upcoming sessions          |
| GET    | `/api/sessions/mycompleted`                   | User - View completed sessions         |
| GET    | `/api/sessions/soon`                          | User - View sessions from a date       |
| GET    | `/api/sessions/:id`                           | User - View session by ID              |
| POST   | `/api/sessions/register/:id`                  | User - Register for session            |
| POST   | `/api/sessions/unregister/:id`                | User - Unregister from session         |

---

## 📁 Project Structure

```
src/
├── config/             # DB, Redis, Mailer
├── controllers/        # API logic
├── routes/             # Express routes
├── middleware/         # Auth, roles, errors, async handlers, rate limiter
├── models/             # Mongoose schemas
├── producers/          # Bull queues producers
├── workers/            # Bull workers
└── utils/              # General helpers
```

---

## 🖥️ Frontend

Frontend is a separate PWA project built with React (still under development):  
🔗 [pilatesapp-frontend](https://github.com/kobihanoch/pilatesapp-frontend)

---

## 📄 License

MIT License

---

## 📫 Contact

- GitHub: [@kobihanoch](https://github.com/kobihanoch)
- Email: kobikobi622@gmail.com
