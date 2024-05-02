# Authentication Endpoint Documentation

## Overview

The `auth/` endpoint provides functionality for user authentication, registration, email confirmation, password reset, and logout in a web application.

## Base URL

The base URL for accessing the authentication endpoint is `api/auth`.

## Authentication Methods

### Login

- **Description**: Allows existing users to log in by providing their credentials.
- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:
    - `login` (string): User's login username.
    - `password` (string): User's password.
- **Response**:
    - Success (200 OK):
        - JSON object containing user information:
            - `id` (string): User ID.
            - `login` (string): User's login username.
            - `full_name` (string): User's full name.
            - `email` (string): User's email address.
            - `picture` (string): URL to the user's profile picture.
    - Error:
        - 401 Unauthorized: Invalid login credentials.
        - 403 Forbidden: Account not confirmed. User needs to confirm their account first.

### Registration

- **Description**: Allows new users to create an account.
- **URL**: `/registration`
- **Method**: `POST`
- **Request Body**:
    - `login` (string): Desired login username.
    - `password` (string): User's chosen password.
    - `email` (string): User's email address.
    - `full_name` (string): User's full name.
- **Response**:
    - Success (200 OK): Account successfully created.
    - Error:
        - 409 Conflict: User with the provided login or email already exists.

### Email Confirmation

- **Description**: Confirms user's email address after registration.
- **URL**: `/confirm-email/:token`
- **Method**: `GET`
- **URL Parameters**:
    - `token` (string): Token sent to the user's email for confirmation.
- **Response**:
    - Success (200 OK): Email confirmed successfully.

### Logout

- **Description**: Logs out the currently logged-in user.
- **URL**: `/logout`
- **Method**: `GET`
- **Response**:
    - Success (200 OK): User successfully logged out.

## Password Management

### Password Reset Request

- **Description**: Allows users to request a password reset.
- **URL**: `/password-reset`
- **Method**: `POST`
- **Request Body**:
    - `email` (string): User's email address.
- **Response**:
    - Success (200 OK): Password reset email sent.

### Set New Password

- **Description**: Allows users to set a new password after initiating a password reset.
- **URL**: `/set-new-password/:token`
- **Method**: `POST`
- **URL Parameters**:
    - `token` (string): Token sent to the user's email for password reset.
- **Request Body**:
    - `password` (string): User's new password.
- **Response**:
    - Success (200 OK): New password set successfully.

## Error Handling

The endpoint returns appropriate HTTP status codes and error messages for various scenarios, such as invalid credentials, existing user conflicts, and server errors.

## Libraries Used

- **jsonwebtoken**: For generating and verifying authentication tokens.
- **nodemailer**: For sending emails for account confirmation and password reset.
- **bcrypt**: For hashing passwords securely.

---

