# Users Endpoint Documentation

## Overview

The `users/` endpoint provides functionality for managing users in a web application.

## Base URL

The base URL for accessing the users endpoint is `api/users`.

## User Methods

### Get Users

- **Description**: Retrieves all users or users associated with a specific event.
- **URL**: `/`
- **Method**: `GET`
- **Query Parameters**:
    - `eventId` (optional, integer): ID of the event to retrieve users for.
    - `comments` (optional, boolean): If provided with `eventId`, retrieves users who have commented on the event.
- **Response**:
    - Success (200 OK):
        - JSON object containing an array of users.

### Get User

- **Description**: Retrieves a specific user by their ID.
- **URL**: `/:id`
- **Method**: `GET`
- **URL Parameters**:
    - `id` (integer): ID of the user to retrieve.
- **Response**:
    - Success (200 OK):
        - JSON object containing the user's data.
    - Error:
        - 404 Not Found: User with the specified ID not found.

### Update User

- **Description**: Updates an existing user's information.
- **URL**: `/:id`
- **Method**: `PUT`
- **URL Parameters**:
    - `id` (integer): ID of the user to update.
- **Request Body**:
    - `login` (string, optional): New login username.
    - `password` (string, optional): New password.
    - `email` (string, optional): New email address.
    - `full_name` (string, optional): New full name.
- **Response**:
    - Success (201 Created): User updated successfully.
    - Error:
        - 400 Bad Request: User already exists (for login and email).
        - 409 Conflict: User exists (for login and email).

### Update User Photo

- **Description**: Updates the profile photo of a user.
- **URL**: `/:id/photo`
- **Method**: `POST`
- **URL Parameters**:
    - `id` (integer): ID of the user to update.
- **Request Body**:
    - Image file.
- **Response**:
    - Success (200 OK): User photo updated successfully.
    - Error:
        - 400 Bad Request: No file provided.

### Delete User Photo

- **Description**: Deletes the profile photo of a user.
- **URL**: `/:id/photo`
- **Method**: `DELETE`
- **URL Parameters**:
    - `id` (integer): ID of the user to update.
- **Response**:
    - Success (204 No Content): User photo deleted successfully.

### Get All Ticket Events

- **Description**: Retrieves all events for which the user has purchased tickets.
- **URL**: `/tickets`
- **Method**: `GET`
- **Response**:
    - Success (200 OK):
        - JSON object containing an array of events.

## Error Handling

The endpoint returns appropriate HTTP status codes and error messages for various scenarios, such as existing users, missing user details, and server errors.

## Models Used

- **Users**: Model for accessing and managing user data.
- **Events**: Model for accessing and managing event data.

---