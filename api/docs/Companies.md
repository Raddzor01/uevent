# Companies Endpoint Documentation

## Overview

The `companies/` endpoint provides functionality for managing companies in a web application.

## Base URL

The base URL for accessing the companies endpoint is `/companies`.

## Company Methods

### Get All Companies

- **Description**: Retrieves all companies or companies associated with a specific user.
- **URL**: `/`
- **Method**: `GET`
- **Query Parameters**:
    - `userId` (optional, integer): ID of the user to retrieve companies for.
- **Response**:
    - Success (200 OK):
        - JSON object containing an array of companies.

### Get Company

- **Description**: Retrieves a specific company by its ID.
- **URL**: `/:id`
- **Method**: `GET`
- **URL Parameters**:
    - `id` (integer): ID of the company to retrieve.
- **Response**:
    - Success (200 OK):
        - JSON object containing the company details.

### Create Company

- **Description**: Creates a new company.
- **URL**: `/`
- **Method**: `POST`
- **Request Body**:
    - `name` (string): Name of the company.
    - `email` (string): Email address of the company.
    - `latitude` (number): Latitude coordinate of the company location.
    - `longitude` (number): Longitude coordinate of the company location.
- **Response**:
    - Success (200 OK):
        - JSON object containing the ID of the newly created company.
    - Error:
        - 409 Conflict: Company with the provided name or email already exists.

### Update Company

- **Description**: Updates an existing company.
- **URL**: `/:id`
- **Method**: `PUT`
- **URL Parameters**:
    - `id` (integer): ID of the company to update.
- **Request Body**:
    - `name` (string, optional): New name of the company.
    - `email` (string, optional): New email address of the company.
    - `latitude` (number, optional): New latitude coordinate of the company location.
    - `longitude` (number, optional): New longitude coordinate of the company location.
- **Response**:
    - Success (201 Created): Company updated successfully.
    - Error:
        - 409 Conflict: Company with the new name or email already exists.

### Delete Company

- **Description**: Deletes a company.
- **URL**: `/:id`
- **Method**: `DELETE`
- **URL Parameters**:
    - `id` (integer): ID of the company to delete.
- **Response**:
    - Success (204 No Content): Company deleted successfully.

## Stripe Integration

### Create Stripe Account

- **Description**: Creates a new Stripe account for a company.
- **URL**: `/:id/create-stripe-account`
- **Method**: `POST`
- **URL Parameters**:
    - `id` (integer): ID of the company.
- **Response**:
    - Success (200 OK):
        - JSON object containing the URL for completing the Stripe account setup.

### Get Stripe Account

- **Description**: Retrieves the Stripe account details for a company.
- **URL**: `/:id/get-stripe-account`
- **Method**: `GET`
- **URL Parameters**:
    - `id` (integer): ID of the company.
- **Response**:
    - Success (200 OK):
        - JSON object containing the URL for accessing the company's Stripe account.
    - Error:
        - 404 Not Found: Company not found.
        - 403 Forbidden: Stripe account does not exist or is not connected.

## Error Handling

The endpoint returns appropriate HTTP status codes and error messages for various scenarios, such as existing company conflicts, missing files, and server errors.

## External Services

- **Stripe**: Integration for handling payments and managing Stripe accounts.

---