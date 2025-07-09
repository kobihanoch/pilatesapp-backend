# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.4.0](https://github.com/kobihanoch/pilatesapp-backend/compare/v1.3.0...v1.4.0) (2025-07-09)


### Features

* **Dependencies:** Add express-rate-limit package ([fb85fe5](https://github.com/kobihanoch/pilatesapp-backend/commit/fb85fe53ae992baf847e7db5a6cc89a1f9a91334))
* **Emails:** Add expiration time to queued emails ([859c961](https://github.com/kobihanoch/pilatesapp-backend/commit/859c96143771389009c42a7ac46e4296f3c16d40))
* **Queues:** Use bull queues and workers, instead of direct redis service. ([509a1be](https://github.com/kobihanoch/pilatesapp-backend/commit/509a1be9c8189b84b1ebadca61fae3d00a40bb86))
* **RateLimiter:** Implement general rate limiter middleware for request control ([a261fa2](https://github.com/kobihanoch/pilatesapp-backend/commit/a261fa2012d40c94d27067cfe234aaad73f541e9))

## [1.3.0](https://github.com/kobihanoch/pilatesapp-backend/compare/v1.2.0...v1.3.0) (2025-07-09)


### Features

* **Email:** Implement email queueing system with Redis and worker (Docker compose) ([078c8a4](https://github.com/kobihanoch/pilatesapp-backend/commit/078c8a4639ac1c117e75f5bc8aa08ca29a6f74a3))
* **Redis:** Connect Redis client and update dependencies ([a665157](https://github.com/kobihanoch/pilatesapp-backend/commit/a665157720075ddb82c20751354383c05c1b3ec5))
* **Sessions:** Add email notification for updated sessions ([3c3353b](https://github.com/kobihanoch/pilatesapp-backend/commit/3c3353b9e578447dbae4f5004a628b1eedf880bc))
* **Sessions:** Added an endpoint to fetch all completed sessions for an authenticated user ([f4fb25c](https://github.com/kobihanoch/pilatesapp-backend/commit/f4fb25c68d09eb07c836b858231f60910ac80ae2))
* **Sessions:** Implement email notifications for cancelled sessions and add mailer utility (Resend) ([f06f272](https://github.com/kobihanoch/pilatesapp-backend/commit/f06f27235138d7070cec0d7a34609eed7c89ddc6))


### Bug Fixes

* **Emails:** Emails are now sent properly ([c7ca5f0](https://github.com/kobihanoch/pilatesapp-backend/commit/c7ca5f0c856d72d62628e385f4d3896e36f9c04e))
* **UpcomingSessions:** Fixed incorrect sorting ([19f9d22](https://github.com/kobihanoch/pilatesapp-backend/commit/19f9d22692f1a19d810939b0db34a610b11676f3))

## [1.2.0](https://github.com/kobihanoch/pilatesapp-backend/compare/v1.1.0...v1.2.0) (2025-07-01)


### Features

* **Sessions:** Add cancel session functionality and unregister a user from a session to admins ([cc7291e](https://github.com/kobihanoch/pilatesapp-backend/commit/cc7291e6934a44de49b8c0fdeaefde01b7107d8d))
* **Sessions:** Added 2 new endpoints to register/unregister a user to a session for admin routes ([d41eae0](https://github.com/kobihanoch/pilatesapp-backend/commit/d41eae03cbab34dd43f668da5788e9382b8346b6))
* **Users:** Fetch all users with pagination ([88137c9](https://github.com/kobihanoch/pilatesapp-backend/commit/88137c94083cc7deba95b9c5cfeee2b51d77aaa9))


### Bug Fixes

* **Sessions:** Add validation to unregister user from session ([033d3ab](https://github.com/kobihanoch/pilatesapp-backend/commit/033d3ab9f207eb2fce2e3a39f55ba7a883813b89))
* **Sessions:** Correct route definitions for register/unregister endpoints and include participant ID in population ([3045693](https://github.com/kobihanoch/pilatesapp-backend/commit/3045693c331bc87b49525fddfa729f9e4a0bd9ea))
* **Sessions:** Enhance createSession validation for required fields, status, and date constraints ([eb2a0fa](https://github.com/kobihanoch/pilatesapp-backend/commit/eb2a0faeecceab7926a1e6d4b2ad9d7899500556))
* **Sessions:** Include fullName in participants population for paginated sessions ([a945e65](https://github.com/kobihanoch/pilatesapp-backend/commit/a945e650d547878bef4626b0c546b31720e6c9cf))
* **Sessions:** Remove unused code and clean up session controller ([a0b5049](https://github.com/kobihanoch/pilatesapp-backend/commit/a0b504912a8fcf9772e5486be2b2ca6a8f9f5bf2))
* **Sessions:** Update register endpoint to use username instead of userId and add validation for session updates ([b1cd608](https://github.com/kobihanoch/pilatesapp-backend/commit/b1cd608e522087fe7283466720952d90e1ad15ff))
* **Users:** Enhance updateUser endpoint with input sanitization and role validation ([3409a86](https://github.com/kobihanoch/pilatesapp-backend/commit/3409a86bd1153b12abeddf557838eed4140f0acb))

## 1.1.0 (2025-05-28)


### Features

* **Error Handling:** Add error handler middleware and async handler utility ([533e763](https://github.com/kobihanoch/pilatesapp-backend/commit/533e763dae352ef71f96c3c6b31d003f3eb632b5))
* **sessions:** Include session details in registration response ([e88aad7](https://github.com/kobihanoch/pilatesapp-backend/commit/e88aad769685613be5b709c7eca28bb00ee052b2))


### Bug Fixes

* **auth:** Ensure username and password are required for login ([e596cdd](https://github.com/kobihanoch/pilatesapp-backend/commit/e596cdd8dff2942bec56141505fa1524df9e2301))
* **Dockerfile:** Update exposed port from 3000 to 5000 ([1b468ae](https://github.com/kobihanoch/pilatesapp-backend/commit/1b468aec94382b69a24008803cbad31225c6d12d))
