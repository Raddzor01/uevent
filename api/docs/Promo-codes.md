# Promo Codes Endpoint Documentation

## Overview

The `promo-codes/` endpoint provides functionality for managing promo codes in a web application.

## Base URL

The base URL for accessing the promo codes endpoint is `api/promo-codes`.

## Promo Code Methods

### Get All Promo Codes

- **Description**: Retrieves all promo codes or promo codes associated with a specific event.
- **URL**: `/`
- **Method**: `GET`
- **Query Parameters**:
    - `eventId` (optional, integer): ID of the event to retrieve promo codes for.
- **Response**:
    - Success (200 OK):
        - JSON object containing an array of promo codes.

### Get Promo Code

- **Description**: Retrieves a specific promo code by its ID.
- **URL**: `/:id`
- **Method**: `GET`
- **URL Parameters**:
    - `id` (integer): ID of the promo code to retrieve.
- **Response**:
    - Success (200 OK):
        - JSON object containing the promo code details.
    - Error:
        - 404 Not Found: Promo code with the specified ID not found.

### Create Promo Code

- **Description**: Creates a new promo code.
- **URL**: `/`
- **Method**: `POST`
- **Request Body**:
    - `code` (string): Promo code.
    - `discount` (number): Discount percentage.
    - `event_id` (integer): ID of the event associated with the promo code.
- **Response**:
    - Success (200 OK):
        - JSON object containing the ID of the newly created promo code.
    - Error:
        - 409 Conflict: Promo code already exists.

### Update Promo Code

- **Description**: Updates an existing promo code.
- **URL**: `/:id`
- **Method**: `PUT`
- **URL Parameters**:
    - `id` (integer): ID of the promo code to update.
- **Request Body**:
    - `code` (string, optional): New promo code.
    - `discount` (number, optional): New discount percentage.
    - `event_id` (integer, optional): New event associated with the promo code.
- **Response**:
    - Success (201 Created): Promo code updated successfully.
    - Error:
        - 404 Not Found: Event not found.
        - 409 Conflict: Promo code already exists.

### Delete Promo Code

- **Description**: Deletes a promo code.
- **URL**: `/:id`
- **Method**: `DELETE`
- **URL Parameters**:
    - `id` (integer): ID of the promo code to delete.
- **Response**:
    - Success (204 No Content): Promo code deleted successfully.

## Error Handling

The endpoint returns appropriate HTTP status codes and error messages for various scenarios, such as existing promo codes, missing promo code details, and server errors.

## Models Used

- **Promo Codes**: Model for accessing and managing promo code data.
- **Events**: Model for accessing and managing event data.

---