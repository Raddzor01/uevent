# Formats Endpoint Documentation

## Overview

The `formats/` endpoint provides functionality for managing event formats in a web application.

## Base URL

The base URL for accessing the formats endpoint is `api/formats`.

## Format Methods

### Get All Formats

- **Description**: Retrieves all event formats.
- **URL**: `/`
- **Method**: `GET`
- **Response**:
    - Success (200 OK):
        - JSON object containing an array of formats.

### Get Format

- **Description**: Retrieves a specific event format by its ID.
- **URL**: `/:id`
- **Method**: `GET`
- **URL Parameters**:
    - `id` (integer): ID of the format to retrieve.
- **Response**:
    - Success (200 OK):
        - JSON object containing the format details.
    - Error:
        - 404 Not Found: Format with the specified ID not found.

### Create Format

- **Description**: Creates a new event format.
- **URL**: `/`
- **Method**: `POST`
- **Request Body**:
    - `name` (string): Name of the format.
- **Response**:
    - Success (200 OK):
        - JSON object containing the ID of the newly created format.
    - Error:
        - 400 Bad Request: Format already exists.

### Update Format

- **Description**: Updates an existing event format.
- **URL**: `/:id`
- **Method**: `PUT`
- **URL Parameters**:
    - `id` (integer): ID of the format to update.
- **Request Body**:
    - `name` (string): New name of the format.
- **Response**:
    - Success (201 Created): Format updated successfully.
    - Error:
        - 400 Bad Request: Format already exists.

### Delete Format

- **Description**: Deletes an event format.
- **URL**: `/:id`
- **Method**: `DELETE`
- **URL Parameters**:
    - `id` (integer): ID of the format to delete.
- **Response**:
    - Success (204 No Content): Format deleted successfully.

## Error Handling

The endpoint returns appropriate HTTP status codes and error messages for various scenarios, such as existing formats, missing format details, and server errors.

## Models Used

- **Formats**: Model for accessing and managing event format data.

---
