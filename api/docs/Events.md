# Events Endpoint Documentation

## Overview

The `events/` endpoint provides functionality for managing events in a web application.

## Base URL

The base URL for accessing the events endpoint is `api/events`.

## Event Methods

### Get All Events

- **Description**: Retrieves all events or events associated with a specific company.
- **URL**: `/`
- **Method**: `GET`
- **Query Parameters**:
    - `companyId` (optional, integer): ID of the company to retrieve events for.
- **Response**:
    - Success (200 OK):
        - JSON object containing an array of events.

### Get Event

- **Description**: Retrieves a specific event by its ID.
- **URL**: `/:id`
- **Method**: `GET`
- **URL Parameters**:
    - `id` (integer): ID of the event to retrieve.
- **Response**:
    - Success (200 OK):
        - JSON object containing the event details.
    - Error:
        - 404 Not Found: Event with the specified ID not found.

### Create Event

- **Description**: Creates a new event.
- **URL**: `/`
- **Method**: `POST`
- **Request Body**:
    - `name` (string): Name of the event.
    - `description` (string): Description of the event.
    - `date` (string): Date and time of the event.
    - `price` (number): Price of the event.
    - `tickets_available` (number): Number of tickets available for the event.
    - `latitude` (number): Latitude coordinate of the event location.
    - `longitude` (number): Longitude coordinate of the event location.
    - `company_id` (integer): ID of the company organizing the event.
    - `format_id` (integer): ID of the event format.
    - `theme_id` (integer): ID of the event theme.
- **Response**:
    - Success (200 OK):
        - JSON object containing the ID of the newly created event.
    - Error:
        - 404 Not Found: Company, format, or theme not found.
        - 409 Conflict: Event with the provided name already exists.

### Update Event

- **Description**: Updates an existing event.
- **URL**: `/:id`
- **Method**: `PUT`
- **URL Parameters**:
    - `id` (integer): ID of the event to update.
- **Request Body**:
    - Same fields as in the create event endpoint.
- **Response**:
    - Success (201 Created): Event updated successfully.

### Delete Event

- **Description**: Deletes an event.
- **URL**: `/:id`
- **Method**: `DELETE`
- **URL Parameters**:
    - `id` (integer): ID of the event to delete.
- **Response**:
    - Success (204 No Content): Event deleted successfully.

### Create Payment

- **Description**: Initiates the payment process for purchasing tickets to an event.
- **URL**: `/:id/create-payment`
- **Method**: `POST`
- **URL Parameters**:
    - `id` (integer): ID of the event.
- **Request Body**:
    - `isVisible` (boolean): Visibility of the ticket purchase.
    - `promo_code` (string, optional): Promo code for applying discounts.
- **Response**:
    - Success (200 OK):
        - JSON object containing the URL for completing the payment process.
    - Error:
        - 404 Not Found: Event not found.
        - 403 Forbidden: Run out of tickets on event
        - 400 Bad Request: Already bought a ticket or no tickets available.

## Error Handling

The endpoint returns appropriate HTTP status codes and error messages for various scenarios, such as existing events, missing event details, and server errors.

## External Services

- **Stripe**: Integration for handling payments and managing Stripe accounts.

---
