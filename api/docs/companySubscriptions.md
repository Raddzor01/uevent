# Company Subscriptions Endpoint Documentation

## Overview

The `company-subscriptions/` endpoint provides functionality for managing subscriptions to companies in a web application.

## Base URL

The base URL for accessing the company subscriptions endpoint is `api/company-subscriptions`.

## Subscription Methods

### Get All User Company Subscriptions

- **Description**: Retrieves all subscriptions of the current user to companies.
- **URL**: `/`
- **Method**: `GET`
- **Request Headers**:
    - `Authorization`: Bearer token containing user authentication credentials.
- **Response**:
    - Success (200 OK):
        - JSON object containing an array of company subscriptions.

### Subscribe to Company

- **Description**: Subscribes the current user to a company.
- **URL**: `/:id/subscribe`
- **Method**: `POST`
- **URL Parameters**:
    - `id` (integer): ID of the company to subscribe to.
- **Request Headers**:
    - `Authorization`: Bearer token containing user authentication credentials.
- **Response**:
    - Success (200 OK): Subscription successful.
    - Error:
        - 404 Not Found: Company not found.
        - 400 Bad Request: Already subscribed to this company.

### Unsubscribe from Company

- **Description**: Unsubscribes the current user from a company.
- **URL**: `/:id/unsubscribe`
- **Method**: `DELETE`
- **URL Parameters**:
    - `id` (integer): ID of the company to unsubscribe from.
- **Request Headers**:
    - `Authorization`: Bearer token containing user authentication credentials.
- **Response**:
    - Success (204 No Content): Unsubscription successful.
    - Error:
        - 404 Not Found: Company not found.
        - 400 Bad Request: Not subscribed to this company.

## Error Handling

The endpoint returns appropriate HTTP status codes and error messages for various scenarios, such as non-existent companies, duplicate subscriptions, and server errors.

## Models Used

- **Company**: Model for accessing and managing company data.
- **Company Subscriptions**: Model for managing user subscriptions to companies.

---