# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
