# Comments Endpoint Documentation

## Overview

The `comments/` endpoint provides functionality for managing comments related to events in a web application.

## Base URL

The base URL for accessing the comments endpoint is `api/comments`.

## Comment Methods

### Get All Comments

- **Description**: Retrieves all comments or comments associated with a specific event.
- **URL**: `/`
- **Method**: `GET`
- **Query Parameters**:
    - `eventId` (optional, integer): ID of the event to retrieve comments for.
- **Response**:
    - Success (200 OK):
        - JSON object containing an array of comments.

### Get Comment

- **Description**: Retrieves a specific comment by its ID.
- **URL**: `/:id`
- **Method**: `GET`
- **URL Parameters**:
    - `id` (integer): ID of the comment to retrieve.
- **Response**:
    - Success (200 OK):
        - JSON object containing the comment details.
    - Error:
        - 404 Not Found: Comment with the specified ID not found.

### Create Comment

- **Description**: Creates a new comment.
- **URL**: `/`
- **Method**: `POST`
- **Request Body**:
    - `content` (string): Content of the comment.
    - `user_id` (integer): ID of the user posting the comment.
    - `event_id` (integer): ID of the event the comment is associated with.
- **Response**:
    - Success (200 OK):
        - JSON object containing the ID of the newly created comment.
    - Error:
        - 404 Not Found: Event does not exist.

### Update Comment

- **Description**: Updates an existing comment.
- **URL**: `/:id`
- **Method**: `PUT`
- **URL Parameters**:
    - `id` (integer): ID of the comment to update.
- **Request Body**:
    - `content` (string): New content of the comment.
- **Response**:
    - Success (201 Created): Comment updated successfully.

### Delete Comment

- **Description**: Deletes a comment.
- **URL**: `/:id`
- **Method**: `DELETE`
- **URL Parameters**:
    - `id` (integer): ID of the comment to delete.
- **Response**:
    - Success (204 No Content): Comment deleted successfully.

## Error Handling

The endpoint returns appropriate HTTP status codes and error messages for various scenarios, such as invalid comment IDs, non-existent events, and server errors.

## Models Used

- **Comments**: Model for accessing and manipulating comment data.
- **Events**: Model for accessing event data.

---
